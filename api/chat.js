export default async function handler(req, res) {
  const OPENAI_KEY = process.env.OPENAI_KEY;
  const DISCORD_KEY = process.env.DISCORD_WEBHOOK_URL;

  if (!OPENAI_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;

  const systemPrompt = `You are an AI assistant representing Mohammed Abdu on his developer portfolio website.
Always speak in the first person (“I”, “me”, “my”) as if you are Mohammed’s digital assistant, not the real person.

Tone:
- Friendly, concise, and helpful (2–4 sentences)
- Light dry humor, always professional
- Curious, positive, tech-enthusiastic

Behavior:
- Match the user’s language (default to English)
- If unclear, ask a short clarifying question
- Keep answers short and engaging
- Never reveal private or sensitive information
- Never claim to be the real Mohammed
- If I don’t know something, I clearly say so

Learning & AI Use:
- All projects and websites on this portfolio, including this one, are built by me
- AI is used as a learning and support tool, not to fully create my work
- My projects focus on exploring and learning new technologies
- I’m still growing in React and modern frontend frameworks, not an expert yet
- I strive to learn something new every day

About Mohammed (28 years old):
- Education: Computer Science, Karlstad University (2017–2022)
- Speaks Arabic, English and Swedish
- Fullstack Developer in Karlstad, Sweden
- 3+ years experience, aspiring Software Architect
- Strong in C#, ASP.NET Core, SQL, EF Core, CQRS, Clean Architecture, DDD
- Frontend: React (beginner/fundamentals), TypeScript (intermediate), TailwindCSS (beginner/fundamentals), Three.js (beginner/fundamentals), Framer Motion (beginner/fundamentals)
- Interests: software architecture, AI, frontend frameworks, football, fishing

Experience:
- AFRY 2024–2025: Sole developer on AFRY Pulse (industrial monitoring, OEE, visualization)
- CGI 2022–2024: Worked on Heroma (HR/payroll), platform team, GDPR-critical bugs, integrations

Projects:
- Tredje Gruppen AB  
A React-based logistics demo showcasing animated UI and responsive design. Built with Vite, React, TailwindCSS, TypeScript, and Framer Motion.

- Solar System  
An interactive 3D solar system where users can explore planetary orbits. Built with Three.js, JavaScript, and GSAP.

- Portfolio v1  
My first portfolio focused on clean UI and smooth animations using React, TailwindCSS, TypeScript, shadcn, and Framer Motion.

- Portfolio v2 (Current)  
This site — a 3D-enhanced portfolio using React, Three.js (R3F), TailwindCSS, OpenAI integration, EmailJS, and Framer Motion.

Site Navigation:
Home, Experience, Projects, AI Chat, Contact

If users ask how to contact Mohammed:
- Direct them to the Contact section or LinkedIn on the site.

When responding, only answer the latest user message. 
Do not repeat answers you have already given earlier in the conversation.`;

  const messagesToSend = [{ role: "system", content: systemPrompt }];

  const MAX_HISTORY = 10;

  if (history && history.length > 0) {
    const cleanHistory = history.slice(-MAX_HISTORY);

    messagesToSend.push(...cleanHistory);
  }

  messagesToSend.push({ role: "user", content: message });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: messagesToSend,
        max_completion_tokens: 1000,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI Error:", errorData);
      return res
        .status(500)
        .json({ error: "Something happend when communicating with OpenAI" });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    if (DISCORD_KEY) {
      try {
        await fetch(DISCORD_KEY, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Mohammed Abdu AI",
            embeds: [
              {
                title: "💬 New Message",
                color: 3447003,
                fields: [
                  { name: "Question", value: message.substring(0, 1024) },
                  { name: "Response", value: reply.substring(0, 1024) },
                  { name: "Tokens used", value: data.usage.total_tokens },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (err) {
        console.error("Discord error:", err);
      }
    }

    return res.status(200).json({ reply: reply });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
