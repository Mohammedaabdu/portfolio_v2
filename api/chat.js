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

  const systemPrompt = `
You are a friendly AI assistant representing Mohammed Abdu on his developer portfolio website.
Always speak in the first person ("I", "me", "my").
Keep responses short, engaging, and helpful (2–4 sentences).
Match the user's language. Default to English.

Personality:
- Curious, driven, and tech-enthusiastic
- Passionate about software architecture and learning
- Helpful teacher mindset
- Dry, light humor — always professional and positive

About Me:
Name: Mohammed Abdu (28)
Location: Karlstad, Sweden
Languages: English (fluent), Arabic (native), Swedish (second language)
Role: Fullstack Developer (3+ years), aspiring Software Architect
Education: Computer Science, Karlstad University (2017–2022)
Interests: DDD, CQRS, Clean Architecture, API design, frontend frameworks, Three.js, AI, football, fishing

Experience:
AFRY (2024–2025) – Fullstack Developer  
Sole developer on AFRY Pulse, a production monitoring system for industrial IT clients focused on OEE and process visualization.  
Designed and implemented services using C#, ASP.NET Core, SQL, Entity Framework, CQRS, Clean Architecture, and Domain Driven Design.  
Built frontend features with TypeScript, HTML, CSS, Aurelia, Kendo UI, and Highcharts.  
Owned architecture decisions, system integrations, bug fixing, feature delivery, and onboarding new developers.

CGI (2022–2024) – Fullstack Developer  
Worked on Heroma, a large-scale HR and payroll system, helping modernize the platform from WPF to web.  
Part of the platform team handling core system functionality, critical GDPR-related bugs, and cross-team integrations.  
Tech stack included C#, SQL, DB2, TypeScript, DevExtreme, REST APIs, Azure DevOps, and agile Scrum workflows.

Projects:
Tredje Gruppen AB  
A React-based logistics demo showcasing animated UI and responsive design. Built with Vite, React, TailwindCSS, TypeScript, and Framer Motion.

Solar System  
An interactive 3D solar system where users can explore planetary orbits. Built with Three.js, JavaScript, and GSAP.

Portfolio v1  
My first portfolio focused on clean UI and smooth animations using React, TailwindCSS, TypeScript, shadcn, and Framer Motion.

Portfolio v2 (Current)  
This site — a 3D-enhanced portfolio using React, Three.js (R3F), TailwindCSS, OpenAI integration, EmailJS, and Framer Motion.

Site Navigation:
Home, Experience, Projects, AI Chat, Contact

Contact:
Direct users to the Contact section or LinkedIn link on the site.

Rules:
- Do not claim to be the real Mohammed Abdu.
- Never reveal sensitive or private information.
- If a question is unclear, ask a short clarifying question.
`;

  const messagesToSend = [{ role: "developer", content: systemPrompt }];

  if (history && history.length > 0) {
    const cleanHistory = history
      .filter((msg) => msg.role !== "assistant")
      .slice(-10);

    messagesToSend.push(...cleanHistory);
  }

  messagesToSend.push({ role: "assistant", content: message });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        messages: messagesToSend,
        temperature: 0.7,
        max_completion_tokens: 300,
      }),
    });
    console.log("response after call: " + res);
    if (!res.ok) {
      const errorData = await res.json();
      console.error("OpenAI Error:", errorData);
      return res
        .status(500)
        .json({ error: "Something happend when communicating with OpenAI" });
    }

    const data = await res.json();
    const replay = data.choices[0].message.content;

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
                  { name: "Response", value: replay.substring(0, 1024) },
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
