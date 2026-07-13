/* Decision tree content for BT Local Business cold calls.
   Node kinds:
   - "script":    say variants + response options
   - "discovery": lead question, question checklist, "if they say" VPs, continue
   - "end":       terminal state with checklist
*/

const DATA = {

  stages: ["Intro", "Discovery", "Qualify", "Close"],

  tree: {

    /* ---------------- START ---------------- */

    start: {
      kind: "script",
      stage: 0,
      title: "What is this call about?",
      say: [
        {
          label: "Opening line",
          text: "Hi, it's Natasha from BT Local Business in Paddington. We support UK businesses with connectivity, mobile and IT solutions. I'm calling from the business management team and part of my role is to make sure you're getting the best value from your business communications. I'm new to your account, so I just need to understand a bit more about your business to offer you the right advice."
        }
      ],
      tip: "Pick your pathway before you dial. The opening line stays the same, the hook changes.",
      optionsLabel: "Pick your pathway",
      options: [
        { label: "Broadband", to: "intro_broadband" },
        { label: "Mobile", to: "intro_mobile" },
        { label: "Security", to: "intro_security" },
        { label: "VoIP and Digital Voice", to: "intro_voip" },
        { label: "AI Assistants", to: "intro_ai" },
        { label: "Acquisition (not our customer)", to: "intro_acquisition" }
      ]
    },

    /* ---------------- INTROS ---------------- */

    intro_broadband: {
      kind: "script",
      stage: 0,
      title: "Broadband hook",
      say: [
        {
          label: "If we don't supply their broadband",
          text: "I can see we already look after part of your communications, but not your broadband. I was just wondering what you're using at the moment and whether it's coming up for renewal?"
        },
        {
          label: "If their renewal is coming up",
          text: "I noticed your broadband agreement is coming up for renewal. Rather than letting it roll over, I thought it would be worth having a chat about how we can win your business."
        }
      ],
      options: [
        { label: "Open to talk", to: "qualify_bridge_broadband" },
        { label: "Busy right now", to: "busy" },
        { label: "Not interested", to: "fallback_renewals" },
        { label: "They raise a complaint", to: "complaint" }
      ]
    },

    intro_mobile: {
      kind: "script",
      stage: 0,
      title: "Mobile hook",
      say: [
        {
          label: "The EE angle",
          text: "I don't know if you're aware of this, but about ten years ago BT bought EE, so we can provide business mobile alongside our other services. I can see we look after part of your communications, but not your mobiles. I was wondering who you're with at the moment and when those contracts come up for renewal?"
        }
      ],
      options: [
        { label: "Open to talk", to: "qualify_bridge_mobile" },
        { label: "Busy right now", to: "busy" },
        { label: "Not interested", to: "fallback_renewals" },
        { label: "They raise a complaint", to: "complaint" }
      ]
    },

    intro_security: {
      kind: "script",
      stage: 0,
      title: "Security hook",
      say: [
        {
          label: "Main version",
          text: "This will be a slightly different call to what you're used to with BT. As you might know, we have a focus on cybersecurity this year, with all the developments in AI causing an increase in cyber attacks. You may not be aware that BT are also security specialists. I'd like to set up a meeting with one of my specialists to do a full consultation with you. First, I just need to know a bit more about your business."
        },
        {
          label: "Infrastructure version",
          text: "As you know, there's been a significant increase in cyber attacks against businesses. BT are trusted to secure the infrastructure in the UK, and we want to help you protect your digital estate. Ideally, we want to set up a discovery meeting to see how we can help your business overcome this challenge."
        }
      ],
      options: [
        { label: "Open to talk", to: "qualify_bridge_security" },
        { label: "Busy right now", to: "busy" },
        { label: "Not interested", to: "fallback_renewals" },
        { label: "They raise a complaint", to: "complaint" }
      ]
    },

    intro_voip: {
      kind: "script",
      stage: 0,
      title: "VoIP and Digital Voice hook",
      say: [
        {
          label: "Digital switchover angle",
          text: "As you may know, the old analogue phone lines are being switched off and everything is moving to digital. Part of my role is making sure our customers are ready for that. I was wondering how your current phone system is set up and how it's working for you, especially if you have people working from different locations."
        }
      ],
      options: [
        { label: "Open to talk", to: "qualify_bridge_voip" },
        { label: "Busy right now", to: "busy" },
        { label: "Not interested", to: "fallback_renewals" },
        { label: "They raise a complaint", to: "complaint" }
      ]
    },

    intro_ai: {
      kind: "script",
      stage: 0,
      title: "AI Assistants hook",
      say: [
        {
          label: "Productivity angle",
          text: "This will be a slightly different call to what you're used to with BT. A lot of our customers are asking how AI can save their teams time. BT now offers AI assistants that take care of routine tasks and customer enquiries. I'd like to show you what that could look like for your business. First, I just need to understand a bit more about how you work."
        }
      ],
      options: [
        { label: "Open to talk", to: "qualify_bridge_ai" },
        { label: "Busy right now", to: "busy" },
        { label: "Not interested", to: "fallback_renewals" },
        { label: "They raise a complaint", to: "complaint" }
      ]
    },

    intro_acquisition: {
      kind: "script",
      stage: 0,
      title: "Acquisition hook",
      say: [
        {
          label: "Full version",
          text: "I know we aren't currently your preferred supplier at present, so I wanted to ask why that is, so we can explore how we can change that. I know you will have existing contracts, so it would be great to understand more about the business, to gain some insight into how we might be able to help you, and to know when your various contracts are coming up for review and any projects you might have coming up."
        },
        {
          label: "Light version",
          text: "I know we aren't your preferred supplier at present, so at the very least it would be great to know when your various contracts are coming up for renewal, so I can get in touch at the right times to show you what we have to offer."
        }
      ],
      options: [
        { label: "Open to talk", to: "qualify_bridge_acquisition" },
        { label: "Busy right now", to: "busy" },
        { label: "Not interested", to: "fallback_renewals" },
        { label: "They raise a complaint", to: "complaint" }
      ]
    },

    /* ---------------- QUALIFY BRIDGES ---------------- */

    qualify_bridge_broadband: {
      kind: "script",
      stage: 1,
      title: "Bridge into discovery",
      say: [
        {
          label: "The bridge",
          text: "So that I can make sure you get the best out of the time with our consultant, I'll just ask you a few questions to get a better picture."
        }
      ],
      options: [{ label: "Start discovery", to: "discovery_broadband", primary: true }]
    },

    qualify_bridge_mobile: {
      kind: "script",
      stage: 1,
      title: "Bridge into discovery",
      say: [
        {
          label: "The bridge",
          text: "So that I can make sure you get the best out of the time with our consultant, I'll just ask you a few questions to get a better picture."
        }
      ],
      options: [{ label: "Start discovery", to: "discovery_mobile", primary: true }]
    },

    qualify_bridge_security: {
      kind: "script",
      stage: 1,
      title: "Bridge into discovery",
      say: [
        {
          label: "The bridge",
          text: "So that I can make sure you get the best out of the time with our consultant, I'll just ask you a few questions to get a better picture."
        }
      ],
      options: [{ label: "Start discovery", to: "discovery_security", primary: true }]
    },

    qualify_bridge_voip: {
      kind: "script",
      stage: 1,
      title: "Bridge into discovery",
      say: [
        {
          label: "The bridge",
          text: "So that I can make sure you get the best out of the time with our consultant, I'll just ask you a few questions to get a better picture."
        }
      ],
      options: [{ label: "Start discovery", to: "discovery_voip", primary: true }]
    },

    qualify_bridge_ai: {
      kind: "script",
      stage: 1,
      title: "Bridge into discovery",
      say: [
        {
          label: "The bridge",
          text: "So that I can make sure you get the best out of the time with our consultant, I'll just ask you a few questions to get a better picture."
        }
      ],
      options: [{ label: "Start discovery", to: "discovery_ai", primary: true }]
    },

    qualify_bridge_acquisition: {
      kind: "script",
      stage: 1,
      title: "Bridge into discovery",
      say: [
        {
          label: "The bridge",
          text: "So that I can make sure I put the right things in front of you, I'll just ask you a few questions to get a better picture."
        }
      ],
      options: [{ label: "Start discovery", to: "discovery_acquisition", primary: true }]
    },

    /* ---------------- DISCOVERY ---------------- */

    discovery_broadband: {
      kind: "discovery",
      stage: 1,
      title: "Broadband discovery",
      lead: "Tell me about your current broadband and network setup.",
      questions: [
        "Who currently provides your broadband or leased line?",
        "How reliable is your current connection?",
        "Have you experienced any outages or slow speeds in the last 12 months?",
        "Are there any sites or locations that struggle with connectivity?",
        "Do you expect your bandwidth requirements to increase over the next year?",
        "When does your agreement come up for renewal?"
      ],
      situations: [
        {
          label: "Slow speeds or outages",
          vp: "That's something we hear quite often. BT helps businesses improve reliability with scalable connectivity solutions that are designed to minimise downtime and keep teams productive."
        },
        {
          label: "They're growing",
          vp: "As your business grows, your connectivity needs to grow with it. BT offers solutions that can scale without disrupting your operations."
        },
        {
          label: "Happy with their provider",
          vp: "That's good to hear. Many of our customers felt the same until they compared what BT could offer in terms of resilience, performance and long-term value."
        }
      ],
      angle: "Product angle: BTNet leased line. Uncontended, symmetrical speeds with SLAs.",
      next: { label: "Move to qualification", to: "qualify_final" }
    },

    discovery_mobile: {
      kind: "discovery",
      stage: 1,
      title: "Mobile discovery",
      lead: "Tell me how your team uses mobiles day to day.",
      questions: [
        "Who provides your business mobiles at the moment?",
        "How many connections or handsets do you have?",
        "Any coverage or signal issues where your team works?",
        "Do your staff work from different locations?",
        "Do you need roaming or international calling?",
        "When do those contracts come up for renewal?"
      ],
      situations: [
        {
          label: "Coverage complaints",
          vp: "We're on the EE network, which gives the most extensive UK coverage plus 5G, so your team stays connected wherever they work."
        },
        {
          label: "Juggling multiple suppliers",
          vp: "One advantage of BT is being able to consolidate mobile, broadband and voice under one trusted provider, making management much simpler."
        },
        {
          label: "Happy with their provider",
          vp: "That's good to hear. Many of our customers felt the same until they compared what BT could offer in terms of coverage, support and long-term value."
        }
      ],
      angle: "Product angle: flexible business plans on the EE network. Voice, data, device management and roaming.",
      next: { label: "Move to qualification", to: "qualify_final" }
    },

    discovery_security: {
      kind: "discovery",
      stage: 1,
      title: "Security discovery",
      lead: "Tell me about your current approach to cybersecurity.",
      questions: [
        "What measures do you have in place to protect the business from cyber threats?",
        "Have you reviewed your cybersecurity strategy in the last 12 months?",
        "Are your employees regularly trained on cyber awareness?",
        "Do you have endpoint protection and email security in place?",
        "How confident are you that your current provider is keeping you secure?"
      ],
      situations: [
        {
          label: "Security is a concern",
          vp: "Cyber threats continue to evolve, which is why BT provides security solutions designed to protect your network, users and business around the clock."
        },
        {
          label: "Haven't reviewed recently",
          vp: "Technology changes quickly, so many businesses benefit from reviewing whether their current protection still matches today's risks."
        },
        {
          label: "They're confident",
          vp: "That's great to hear. We often provide an independent review to identify any gaps or opportunities for improvement."
        }
      ],
      angle: "Product angle: managed security. Endpoint, email, firewall, threat detection and cyber awareness tools.",
      next: { label: "Move to qualification", to: "qualify_final" }
    },

    discovery_voip: {
      kind: "discovery",
      stage: 1,
      title: "Voice and remote working discovery",
      lead: "Tell me how your team communicates with customers and each other.",
      questions: [
        "Are you using a cloud-based phone system or a traditional setup?",
        "Are you happy with the reliability and features of your current platform?",
        "Any challenges managing calls across multiple locations or remote workers?",
        "Do customers ever struggle to get through to the right person?",
        "Do remote staff get the same experience as those in the office?",
        "If you could improve one thing about your communications, what would it be?"
      ],
      situations: [
        {
          label: "Outdated phone system",
          vp: "Many businesses are moving to cloud-based communications because it gives employees greater flexibility while reducing complexity and maintenance."
        },
        {
          label: "Remote teams struggle",
          vp: "BT brings voice, video and collaboration together so employees can stay connected wherever they're working."
        },
        {
          label: "Customers miss calls",
          vp: "Cloud telephony and intelligent call routing can help ensure customers reach the right person first time."
        }
      ],
      angle: "Product angle: Digital Voice and Cloud Work. Cloud calling, collaboration and call routing for hybrid teams.",
      next: { label: "Move to qualification", to: "qualify_final" }
    },

    discovery_ai: {
      kind: "discovery",
      stage: 1,
      title: "AI Assistants discovery",
      lead: "Describe what a typical day looks like for your team.",
      questions: [
        "Which routine tasks take up most of your team's time?",
        "How many customer enquiries do you handle, and how do they come in?",
        "What systems does your team work in day to day?",
        "Where do things bottleneck when you get busy?",
        "Have you explored using AI anywhere in the business yet?"
      ],
      situations: [
        {
          label: "Buried in admin",
          vp: "AI assistants automate routine tasks and administrative processes, so your team can focus on higher-value work."
        },
        {
          label: "High enquiry volume",
          vp: "AI assistants can answer customer enquiries and route the rest to the right person, improving response times without adding headcount."
        },
        {
          label: "Skeptical about AI",
          vp: "That's fair. Most customers start with one small process. A specialist can show you what's realistic for a business like yours, with no obligation."
        }
      ],
      angle: "Product angle: AI assistants that integrate with existing systems to automate tasks and enquiries.",
      next: { label: "Move to qualification", to: "qualify_final" }
    },

    discovery_acquisition: {
      kind: "discovery",
      stage: 1,
      title: "Acquisition discovery",
      lead: "Tell me about your business.",
      questions: [
        "What's kept you with your current suppliers rather than BT?",
        "Who supplies your broadband, mobile and phones today?",
        "When do those contracts come up for renewal?",
        "Any projects coming up where connectivity or communications matter?",
        "What would your next provider need to offer that you're not getting today?"
      ],
      situations: [
        {
          label: "Bad past experience with BT",
          vp: "I appreciate you telling me that. My job is to change that experience, and it starts with understanding your business properly and getting the timing right."
        },
        {
          label: "Tied into a contract",
          vp: "That's perfectly understandable. We can review your options now so you've got plenty of time to make an informed decision before renewal."
        },
        {
          label: "Open to change",
          vp: "That's exactly where we can help, by comparing your current setup against solutions that better support your business goals."
        }
      ],
      angle: "Minimum win: renewal dates for every contract, so you can call back at the right moment.",
      next: { label: "Move to qualification", to: "qualify_final" }
    },

    /* ---------------- FINAL QUALIFICATION ---------------- */

    qualify_final: {
      kind: "discovery",
      stage: 2,
      title: "Qualify before the close",
      lead: "What are your business goals over the next 12 to 24 months?",
      questions: [
        "Are you looking to reduce costs, improve reliability or support growth?",
        "Has the business changed much since you last reviewed your communications?",
        "Are all your services due to renew at the same time?",
        "Have you already been approached about your renewal?",
        "Who else would need to be involved in a decision like this?"
      ],
      situations: [
        {
          label: "Renewal approaching",
          vp: "Renewal is often the best opportunity to benchmark what's available and make sure you're getting the right solution."
        },
        {
          label: "Focused on cost",
          vp: "Many businesses discover opportunities to reduce costs by consolidating services and reviewing what they're actually using."
        },
        {
          label: "Values service over price",
          vp: "BT focuses on delivering long-term value through reliability, service and support, not simply offering the lowest monthly cost."
        }
      ],
      angle: "You need three things before the close: their pain, their renewal date, and who decides.",
      next: { label: "Go to the close", to: "close" }
    },

    /* ---------------- CLOSE ---------------- */

    close: {
      kind: "script",
      stage: 3,
      title: "Book the meeting",
      say: [
        {
          label: "The close",
          text: "So just to recap, based on what you've told me, I think it would be worth having a conversation with one of our specialists. There's no obligation to sign any new contracts, but they have the knowledge and the expertise with our catalogue to help business customers solve their problems and achieve their goals. They can sit down with you, whether it's 30 minutes or an hour, and offer expert consultancy on your connectivity, telecoms and security. At the very least, you walk away with a comparative look at what other businesses are using and what's available to you. Sound good? Do you have time for a meeting this week or next?"
        }
      ],
      tip: "Recap their own words first: their provider, their pain points, their renewal date. Then ask for a day, not a yes.",
      options: [
        { label: "Meeting booked", to: "end_booked", primary: true },
        { label: "Why would I need a specialist?", to: "objection_specialist" },
        { label: "Hesitant or wants to think", to: "objection_soft" },
        { label: "No meeting", to: "end_email" }
      ]
    },

    objection_specialist: {
      kind: "script",
      stage: 3,
      title: "Flip: why a specialist?",
      say: [
        {
          label: "The flip",
          text: "Ultimately, at the end of the day, I'm calling to find out how we can help your connectivity work better for you. Our consultants help businesses accelerate their objectives. They can assess your current setup and discuss what's available for you at your location."
        }
      ],
      options: [
        { label: "Back to the close", to: "close", primary: true },
        { label: "Still no", to: "end_email" }
      ]
    },

    objection_soft: {
      kind: "script",
      stage: 3,
      title: "Soften and reassure",
      say: [
        {
          label: "No obligation",
          text: "That's completely fair. There's no obligation to sign anything. Think of it as a free expert review. At the very least, you walk away knowing what other businesses like yours are doing and what's available to you at your location. Shall we pencil something in and you can always move it?"
        }
      ],
      options: [
        { label: "Meeting booked", to: "end_booked", primary: true },
        { label: "Still no", to: "end_email" }
      ]
    },

    /* ---------------- SIDE BRANCHES ---------------- */

    busy: {
      kind: "script",
      stage: 0,
      title: "They're busy",
      say: [
        {
          label: "Keep the door open",
          text: "No problem at all, I appreciate you're busy. When would be a better time for me to catch you? Even two minutes to note down your renewal dates means I can call you at the right moment rather than bothering you."
        }
      ],
      options: [
        { label: "Callback agreed", to: "end_callback", primary: true },
        { label: "They keep talking", to: "start_discovery_redirect" },
        { label: "Not interested", to: "fallback_renewals" }
      ]
    },

    start_discovery_redirect: {
      kind: "script",
      stage: 1,
      title: "They stayed on the line",
      say: [
        {
          label: "Bridge",
          text: "Great, while I've got you then, I'll just ask you a few quick questions to get a better picture."
        }
      ],
      options: [
        { label: "Broadband questions", to: "discovery_broadband" },
        { label: "Mobile questions", to: "discovery_mobile" },
        { label: "Security questions", to: "discovery_security" },
        { label: "Voice questions", to: "discovery_voip" }
      ]
    },

    fallback_renewals: {
      kind: "script",
      stage: 0,
      title: "At least get the renewal dates",
      say: [
        {
          label: "The minimum win",
          text: "I completely understand. At the very least, it would be great to know when your various contracts are coming up for renewal, so I can get in touch at the right time to show you what we have to offer."
        }
      ],
      options: [
        { label: "Gave renewal dates", to: "end_email", primary: true },
        { label: "Still no", to: "end_polite" }
      ]
    },

    complaint: {
      kind: "script",
      stage: 0,
      title: "Handle the complaint first",
      say: [
        {
          label: "Empathy first",
          text: "Oh no, I'm so sorry to hear that. Have you spoken to our faults team? If you'd like, we can book a time to follow up and have a more in-depth review."
        }
      ],
      tip: "Don't sell past a complaint. Resolve or route it, then the review meeting becomes the natural next step.",
      options: [
        { label: "Book a review meeting", to: "end_booked", primary: true },
        { label: "Route to faults, then continue", to: "start_discovery_redirect" },
        { label: "End the call", to: "end_email" }
      ]
    },

    /* ---------------- ENDINGS ---------------- */

    end_booked: {
      kind: "end",
      stage: 3,
      tone: "success",
      title: "Meeting booked",
      text: "Lock it in while they're on the line.",
      checklist: [
        "Confirm the day and time back to them",
        "Ask who else should attend",
        "Confirm the best email and send the invite now",
        "Note their provider, pain points and renewal dates for the consultant"
      ]
    },

    end_email: {
      kind: "end",
      stage: 3,
      tone: "neutral",
      title: "Email follow-up",
      text: "I've got an email address here, is that the best one for yourself? What I'll do in the meantime is send you a quick email about what we have to offer. You can take a look and contact me as and when you need, so when you're looking to renew your contracts, you can come straight to me.",
      checklist: [
        "Confirm their email address",
        "Send the follow-up email today",
        "Log renewal dates and set a callback reminder"
      ]
    },

    end_callback: {
      kind: "end",
      stage: 0,
      tone: "neutral",
      title: "Callback scheduled",
      text: "Confirm the day and time back to them before you hang up.",
      checklist: [
        "Book the callback in your calendar now",
        "Note anything they mentioned for the next call"
      ]
    },

    end_polite: {
      kind: "end",
      stage: 0,
      tone: "neutral",
      title: "Close it warmly",
      text: "No problem at all, thanks for your time. If anything changes with your contracts, we're here. Have a good day.",
      checklist: [
        "Log the outcome",
        "Set a long-range follow-up if it's worth one"
      ]
    }
  },

  /* ---------------- OVERRIDE PANELS ---------------- */

  panels: {

    valueprops: {
      title: "Key value props",
      sections: [
        {
          heading: "Universal, use anywhere",
          items: [
            "Every business is different, which is why we tailor solutions around your objectives rather than taking a one-size-fits-all approach.",
            "Our role isn't just to provide connectivity. It's to help businesses become more productive, secure and prepared for future growth.",
            "Because BT offers connectivity, mobile, communications and security, we can simplify your technology estate with one strategic partner.",
            "Many organisations come to us looking at cost, but stay because of the reliability, support and expertise they receive.",
            "The goal today isn't to replace what works. It's to identify whether there are opportunities to improve performance, resilience or value."
          ]
        },
        {
          heading: "Connectivity",
          items: [
            "Slow or unreliable: BT improves reliability with scalable connectivity designed to minimise downtime and keep teams productive.",
            "Growing: connectivity that scales without disrupting operations.",
            "Happy with provider: many customers felt the same until they compared BT on resilience, performance and long-term value."
          ]
        },
        {
          heading: "Voice and remote working",
          items: [
            "Outdated system: cloud communications give employees flexibility while reducing complexity and maintenance.",
            "Remote teams: BT brings voice, video and collaboration together so employees stay connected anywhere.",
            "Missed calls: intelligent call routing helps customers reach the right person first time.",
            "Multiple suppliers: consolidate services under one trusted provider."
          ]
        },
        {
          heading: "Security",
          items: [
            "Concerned: BT security protects your network, users and business around the clock.",
            "Not reviewed lately: technology changes fast, so it pays to check protection still matches today's risks.",
            "Confident: we often provide an independent review to identify gaps or improvements."
          ]
        },
        {
          heading: "Costs and contracts",
          items: [
            "Cost focused: businesses often reduce costs by consolidating services and reviewing what they actually use.",
            "Value focused: BT delivers long-term value through reliability, service and support, not simply the lowest monthly cost.",
            "Renewal near: renewal is the best moment to benchmark what's available.",
            "Tied in: review options now, so there's time for an informed decision before renewal."
          ]
        }
      ]
    },

    close: {
      title: "Close and book the meeting",
      sections: [
        {
          heading: "The close",
          items: [
            "So just to recap, based on what you've told me, I think it would be worth having a conversation with one of our specialists. No obligation to sign any new contracts, but they have the knowledge and expertise to help business customers solve their problems and achieve their goals. Whether it's 30 minutes or an hour, you get expert consultancy on your connectivity, telecoms and security. At the very least, you walk away with a comparative look at what other businesses are using and what's available to you. Sound good? Do you have time this week or next?"
          ]
        },
        {
          heading: "If they push back",
          items: [
            "Why a specialist? Ultimately I'm calling to find out how we can help your connectivity work better for you. Our consultants help businesses accelerate their objectives and can assess what's available at your location.",
            "Hesitant? There's no obligation to sign anything. Think of it as a free expert review. Shall we pencil something in and you can always move it?"
          ]
        },
        {
          heading: "Once it's booked",
          items: [
            "Confirm the day and time back to them.",
            "Ask who else should attend.",
            "Confirm the best email and send the invite while on the call.",
            "Brief the consultant: provider, pain points, renewal dates."
          ]
        },
        {
          heading: "If no meeting",
          items: [
            "I've got an email address here, is that the best one for yourself? I'll send you a quick email about what we have to offer, and when you're looking to renew, you can come straight to me."
          ]
        }
      ]
    },

    products: {
      title: "Product knowledge",
      sections: [
        {
          heading: "BTNet (Broadband and leased lines)",
          items: [
            "BT's dedicated leased line service. Uncontended, symmetrical speeds with guaranteed performance.",
            "For businesses that rely on cloud services, VoIP, large file transfers, multiple sites or business-critical connectivity.",
            "SLAs, resilience and scalable bandwidth."
          ]
        },
        {
          heading: "Business Mobile (EE network)",
          items: [
            "BT bought EE about ten years ago, so mobile sits alongside all our services.",
            "Flexible plans with the most extensive UK coverage and 5G.",
            "Voice, data, device management, roaming and business support."
          ]
        },
        {
          heading: "BT Security",
          items: [
            "Managed security services protecting businesses from cyber threats.",
            "Endpoint protection, email security, firewall management, threat detection, vulnerability management and cyber awareness tools.",
            "Helps reduce risk and maintain compliance."
          ]
        },
        {
          heading: "Digital Voice and Cloud Work",
          items: [
            "Cloud-based calling and collaboration replacing analogue lines ahead of the switch-off.",
            "Voice, video and collaboration in one place for office, hybrid and remote staff.",
            "Intelligent call routing so customers reach the right person first time."
          ]
        },
        {
          heading: "AI Assistants",
          items: [
            "Automate routine tasks, answer customer enquiries, help employees find information and streamline admin.",
            "Integrates with existing business systems.",
            "Saves time, improves customer experience and frees teams for higher-value work."
          ]
        }
      ]
    },

    discovery: {
      title: "Discovery question bank",
      sections: [
        {
          heading: "Universal",
          items: [
            "How long have you been with your current provider?",
            "When does your agreement come up for renewal?",
            "What's working well at the moment?",
            "If you could change one thing about your current setup, what would it be?",
            "Has your business changed much since you last reviewed your communications?",
            "Do your staff work from different locations?",
            "Are you looking to reduce costs, improve reliability or support growth?",
            "Would it be useful if I showed you what other local businesses are doing?"
          ]
        },
        {
          heading: "Connectivity",
          items: [
            "Who currently provides your broadband or leased line?",
            "How reliable is your current connection?",
            "Any outages or slow speeds in the last 12 months?",
            "Does your connectivity support the way you operate today?",
            "Any sites or locations that struggle?",
            "Will your bandwidth needs increase over the next year?",
            "TED: Tell me about your current broadband and network setup."
          ]
        },
        {
          heading: "Communication",
          items: [
            "How does your team communicate internally and with customers?",
            "Cloud-based phone system or traditional setup?",
            "Happy with reliability and features?",
            "Challenges managing calls across locations or remote workers?",
            "TED: Describe your current phone system and what an ideal one looks like."
          ]
        },
        {
          heading: "Security",
          items: [
            "What measures protect the business from cyber threats?",
            "Reviewed your cybersecurity strategy in the last 12 months?",
            "Are employees trained on cyber awareness?",
            "Endpoint protection and email security in place?",
            "How confident are you in your current provider?",
            "TED: Tell me about your current approach to cybersecurity."
          ]
        },
        {
          heading: "Growth",
          items: [
            "Business goals over the next 12 to 24 months?",
            "Planning to expand, recruit or open locations?",
            "Can your current technology support that growth?",
            "Upcoming projects where better connectivity would help?",
            "What challenges could slow your growth?",
            "TED: Tell me about your plans for the next 12 to 24 months."
          ]
        },
        {
          heading: "Remote working",
          items: [
            "How many employees work remotely or hybrid?",
            "Do remote staff get the same experience as the office?",
            "Issues with collaboration or connectivity for remote workers?",
            "Can remote employees securely access business systems?",
            "TED: Describe how your remote workforce stays connected."
          ]
        },
        {
          heading: "Customer service",
          items: [
            "How important is customer experience to your business?",
            "Do customers struggle to reach the right person?",
            "Can you monitor call performance and response times?",
            "TED: Tell me about the experience you want customers to have."
          ]
        },
        {
          heading: "Costs",
          items: [
            "Confident you're getting good value from your provider?",
            "When did you last review your telecoms costs?",
            "Paying for services you no longer use?",
            "Aside from price, what matters most in a provider?",
            "TED: Explain how you decide whether you're getting good value."
          ]
        },
        {
          heading: "Contracts",
          items: [
            "Who is your current provider?",
            "When does your contract expire?",
            "Do all services renew at the same time?",
            "Already been approached about renewal?",
            "What would you want from your next provider that you're not getting?",
            "If a better solution existed, would you review it before renewal?",
            "TED: Describe how your current agreement is working for you."
          ]
        },
        {
          heading: "General business",
          items: [
            "Tell me about your business.",
            "Describe a typical day for your team.",
            "What's most important to the business this year?",
            "What challenges take up most of your time?",
            "How do you measure success with technology and communications?",
            "Biggest priorities over the next 12 months?"
          ]
        }
      ]
    }
  }
};
