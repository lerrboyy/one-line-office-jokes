# One-Line Office Jokes

[![Competition](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc)
[![Rank](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc/lerrboyy/one-line-office-jokes/rank.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc)
[![Reward](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc/lerrboyy/one-line-office-jokes/reward.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc)

A single line that makes office life funny — an entry for the [One-Line Office Jokes](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc) bounty on make.fun ($2, 5 places paid).

## The entry

> I hit reply-all to tell everyone to stop replying all, and now 47 people are replying all to agree with me.

One line, 107 characters. The joke turns on a real office mechanism — the reply-all storm — and lands the laugh in the last few words: the people flooding the thread are agreeing with the plea to stop flooding the thread.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text, validates it against the kit gate (1–199 Unicode characters, single line, no leading/trailing whitespace, no control characters), writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`, no trailing newline), then reads the file back and verifies it byte-for-byte before printing success.

```sh
OUTPUT_DIR=./out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
