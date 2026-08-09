# Sales Conversation Assistant

Internal cold call assistants for BT Local Business. Stepwise decision trees that guide you through a call, from the opening line to booking the meeting.

Two flows, each self-contained, with a switcher link in the top of the left rail:

| Flow | Path | What it covers |
| --- | --- | --- |
| **BT connectivity** | `/` | Broadband, Mobile, Security, VoIP and Digital Voice, AI Assistants, Acquisition |
| **EE mobile** | `/ee/` | Competitor battle cards: Core Four questions, pain to PIC, Vodafone / O2 / Three / MVNO |

## Run it locally

```
npm start
```

Then open http://localhost:3000. No dependencies to install, it only needs Node.

## Hosted version

The app is static and also served by GitHub Pages from the `docs/` folder on `main`.
Once Pages is enabled (Settings, then Pages, then Deploy from a branch, `main` / `docs`),
it is available at https://nbalabanovic.github.io/Sales-Conversation-Assistant/.

## The EE mobile flow

Built from the EE Business Competitor Battle Cards (BT Local Business London West, FY26/27).

The funnel is Core Four, The Pain, Battle Card, Close.

- **Core Four**, asked in order on every call: the network, the estate, the contract, the pain. The network answer picks the battle card and the estate answer sets corporate or SME, both shown as chips at the top of every later step.
- **Pain branches** into the matching PIC (Problem, Root Cause, Business Impact) with the attack line and a word-for-word response.
- **Battle card** renders for whichever provider was named, with the red "don't discuss" side (plus pivot lines), the green "do discuss" side, and three killer questions.
- **The alignment question** adapts to segment: co-terminus for corporate, Anytime Upgrades for SME, since co-terminus must never be promised to an SME.

Panels: Battle Cards, Objections, Fact-Find, PIC Library, Why EE, ESN Proof, Do / Don't.

## The BT connectivity flow

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
