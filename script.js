const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.tab;
    const group = button.dataset.tabGroup;
    if (!group || !id) return;

    const groupButtons = document.querySelectorAll(`.tab-btn[data-tab-group="${group}"]`);
    const groupPanels = document.querySelectorAll(`.tab-panels[data-tab-group="${group}"] .tab-panel`);

    groupButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    groupPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === id);
    });
  });
});

const flowSteps = {
  build: {
    category: "Prep",
    title: "Build the list before you send",
    summary:
      "Cold email works better when you have a real list, not one perfect person you are waiting on. Volume is key, as long as the people are still relevant.",
    actions: [
      "Use a spreadsheet with name, organization, why you chose them, date sent, follow-up date, and status.",
      "Do not be afraid to reach out to more people. A larger, well-targeted list gives you more chances to learn what works.",
      "Send in batches so you can keep quality high without treating every email like a one-off event."
    ],
    tools: ["Spreadsheet", "Status column", "Weekly send batch"],
    note:
      "The point is not spam. The point is enough organized, relevant outreach that silence from one person does not stop the process."
  },
  ask: {
    category: "Ask",
    title: "Choose the right first ask",
    summary:
      "For research or internships, it can be easier to start with a short coffee chat than to immediately ask for a role. Match the ask to how warm the connection is.",
    actions: [
      "Ask directly about an opportunity when your fit is obvious and you can explain why in one or two lines.",
      "If the person is colder, ask for a brief coffee chat or 10-15 minute conversation first.",
      "Make the ask specific: guidance, a short chat, referral consideration, or help with a particular type of work."
    ],
    tools: ["Coffee chat", "10-15 minute ask", "Specific CTA"],
    note:
      "A smaller first ask can create the conversation that leads to the bigger opportunity."
  },
  compose: {
    category: "Draft",
    title: "Write a short, specific email",
    summary:
      "The email should feel like it was written for this person. Keep it concise, but include enough context that they know why you chose them.",
    actions: [
      "Lead with a concrete reference to their work, lab, company, product, or a recent conversation.",
      "Keep the email short. If you have 2-3 relevant strengths, a tight bulleted list can feel more punchy and modern.",
      "Attach your resume or portfolio when it helps them evaluate you quickly."
    ],
    tools: ["Personalized hook", "Short bullets", "Resume attached"],
    note:
      "Short works when the personalization is real. Generic short emails still feel generic."
  },
  schedule: {
    category: "Timing",
    title: "Send during working hours",
    summary:
      "Timing will not fix a weak email, but it can help a strong one get seen. Schedule send lets you write whenever and deliver at a better time.",
    actions: [
      "Use schedule send so emails land during weekday working hours.",
      "Draft in batches, then schedule the emails instead of sending late at night.",
      "Avoid important first touches on weekends or odd hours when possible."
    ],
    tools: ["Schedule send", "Weekday work hours", "Batch drafting"],
    note:
      "Your writing time and their receiving time do not need to be the same."
  },
  track: {
    category: "Tracking",
    title: "Track every thread",
    summary:
      "The tracker is what makes follow-up reliable. Once an email goes out, the next action should already be written down.",
    actions: [
      "Log the send date, status, and next follow-up date as soon as you send.",
      "Use tools like Mailsuite if you want signals about opens and reminders about when to follow up.",
      "Keep notes on the angle you used so your follow-up can be specific."
    ],
    tools: ["Spreadsheet", "Mailsuite", "Follow-up date"],
    note:
      "If the next follow-up date is not written down, it is easy to forget."
  },
  followup: {
    category: "Follow-Up",
    title: "Follow up after 3-5 business days",
    summary:
      "No response does not always mean no interest. People miss emails. A short follow-up is normal if you wait a few business days.",
    actions: [
      "Wait 3-5 business days before nudging if there is still no response.",
      "Reply in the same thread, restate the ask briefly, and keep it easy to answer.",
      "Use your tracker or Mailsuite-style reminders so the follow-up happens on time."
    ],
    tools: ["3-5 business days", "Same thread", "Reminder"],
    note:
      "A good follow-up is short and useful. It should not feel like pressure."
  },
  conversation: {
    category: "Conversation",
    title: "Make the conversation useful",
    summary:
      "If you get a reply or a coffee chat, prepare enough that the conversation has direction. This is where a cold email can turn into a real relationship.",
    actions: [
      "Reply quickly and suggest a clear next step if they are open to talking.",
      "Come prepared with focused questions about their work, team, or research area.",
      "If an opportunity comes up, confirm the next action before the conversation ends."
    ],
    tools: ["Coffee chat", "Focused questions", "Next step"],
    note:
      "A good chat should end with either a next step, useful advice, or a better person to contact."
  },
  referral: {
    category: "Network",
    title: "Ask for a better person to contact",
    summary:
      "If the person cannot offer an opportunity themselves, they may still know someone who can. This is especially useful for research and lab outreach.",
    actions: [
      "Ask whether anyone in their network might be a better fit for the kind of work you are seeking.",
      "Be specific about the field, project type, or role so they know who would make sense.",
      "Thank them either way and keep the relationship warm."
    ],
    tools: ["Referral ask", "Warm intro", "Specific field"],
    note:
      "A redirect from the wrong person can still get you to the right person."
  },
  volume: {
    category: "Pipeline",
    title: "Keep sending while threads develop",
    summary:
      "Do not stop after one promising reply. Keep adding relevant people, sending good emails, and following up on schedule.",
    actions: [
      "Keep reaching out to more good-fit people while older threads mature.",
      "Send in manageable batches so your outreach stays personalized.",
      "Review what gets replies and adjust your emails over time."
    ],
    tools: ["Rolling list", "Weekly batch", "Reply notes"],
    note:
      "The system improves as you send, track, learn, and repeat."
  }
};

const flowButtons = document.querySelectorAll(".system-step[data-flow-step]");
const flowDetailPanel = document.getElementById("flow-detail-panel");
const flowCategory = document.getElementById("flow-category");
const flowTitle = document.getElementById("flow-title");
const flowSummary = document.getElementById("flow-summary");
const flowActions = document.getElementById("flow-actions");
const flowTools = document.getElementById("flow-tools");
const flowNote = document.getElementById("flow-note");

const renderFlowStep = (stepId) => {
  const step = flowSteps[stepId];
  if (
    !step ||
    !flowDetailPanel ||
    !flowCategory ||
    !flowTitle ||
    !flowSummary ||
    !flowActions ||
    !flowTools ||
    !flowNote
  ) {
    return;
  }

  flowCategory.textContent = step.category;
  flowTitle.textContent = step.title;
  flowSummary.textContent = step.summary;
  flowNote.textContent = step.note;

  const actionItems = step.actions.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  });
  flowActions.replaceChildren(...actionItems);

  const toolItems = step.tools.map((text) => {
    const chip = document.createElement("span");
    chip.textContent = text;
    return chip;
  });
  flowTools.replaceChildren(...toolItems);

  flowButtons.forEach((button) => {
    const isActive = button.dataset.flowStep === stepId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const stepId = button.dataset.flowStep;
    if (!stepId) return;
    renderFlowStep(stepId);
  });
});

if (flowButtons.length > 0) {
  const defaultStep = document.querySelector(".system-step.active[data-flow-step]")?.dataset.flowStep || "build";
  renderFlowStep(defaultStep);
}

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((element) => revealObserver.observe(element));
