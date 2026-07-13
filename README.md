# Sales Conversation Assistant

An internal cold call assistant for BT Local Business. A stepwise decision tree that guides you through discovery calls, from the opening line to booking the specialist meeting.

## Run it

```
npm start
```

Then open http://localhost:3000. No dependencies to install, it only needs Node.

## How it works

The standard funnel is Intro, Discovery, Qualify, Close. Pick a pathway (Broadband, Mobile, Security, VoIP and Digital Voice, AI Assistants, or Acquisition), then click through the call as it unfolds. Each step shows what to say, and the buttons match how the prospect responds.

- Discovery steps have a tappable question checklist and "If they say" chips that reveal the matching value proposition.
- Side branches handle busy prospects, complaints, and "not interested" (falls back to capturing renewal dates).
- Every ending shows a wrap-up checklist (booked, email follow-up, callback, or polite close).

## Overrides

The top bar jumps straight to the four pages most calls centre on, without losing your place in the funnel:

- **Value Props**: universal statements plus per-area responses
- **Questions**: the full discovery question bank by topic
- **Products**: BTNet, Business Mobile (EE), Security, Digital Voice, AI Assistants
- **Close**: the close script, objection flips, and booking checklist

## Shortcuts

- Number keys `1` to `9` pick a response option
- `Backspace` goes back one step
- `Esc` closes an override panel
- Your position persists across refreshes; Restart clears it
