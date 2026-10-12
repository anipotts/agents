---
title: backups and getting your work back
description: choose a backup workflow and practice recovering your work.
products: [codex, claude-code, grok]
updatedAt: "2026-10-12T13:00:00-04:00"
status: current
completion: complete
draft: false
evidence: [official-source, analysis]
sources: [cisa-backup-recovery, cisa-device-data, aws-recovery-strategies, apple-restore-files]
voice: evidence
navigation:
  scope: handbook
  order: 23
---

this guide follows the project notes from [personal infrastructure](/handbook/personal-infrastructure/). use your own important files as you work through it.

## what would you hate to lose?

imagine opening your computer tomorrow and finding your work gone. what would you want back first? start with the things you’d struggle to replace.

for the project notes we’ve been using, that might mean the document itself and any files it links to. also think about work you keep inside apps or chats that you’d want to carry forward.

make a short list of what matters and where it lives. be specific enough that you could find each item again. “project updates in my documents folder” is more useful than “my files.”

that list gives you something concrete to check when you choose your backup workflow.

## choose one backup workflow

take the list you just made and choose a routine you can keep up with. one workflow can include several copies in different places. write down what gets backed up and where each copy goes.

think about how much recent work you’d be willing to lose. if losing a day of project notes would hurt, choose a setup that saves copies more often than that. also consider how long you could manage without access while you recover.

automate the parts your tools support. for anything you need to do yourself, like connecting an external drive or exporting work from an app, choose a regular time and set a reminder.

save a short description of the routine with your project notes. you’ll use it to check what’s covered and practice getting your work back.

## know what each copy protects

sync keeps changes moving between places. check what happens when you delete a file: that deletion may also sync. version history lets you return to earlier versions within the limits of that service. a backup keeps a recoverable copy according to its own schedule and retention settings. check those settings before relying on it.

an external drive gives you another place to keep a copy. while connected, it can still be affected by changes or malware on your computer. an offline copy is disconnected; an offsite copy is stored somewhere else. those describe different kinds of protection. CISA recommends [offline, encrypted backups and regular recovery tests](https://www.cisa.gov/stopransomware/ransomware-guide).

for a small set of project files, a starting workflow could use a tool that saves dated versions to an external drive, plus an encrypted backup stored elsewhere. choose tools that cover your actual files and let you restore an earlier version. check whether documents stored inside an app need their own export.

hot, warm, and cold can describe storage or recovery setups, depending on the service. read what the provider means. for a running application, [AWS describes warm standby](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby) as a smaller, running recovery environment. for your notes, focus first on where the copy is, whether it is connected, and how you would restore it.

## try getting your work back

make a sample document with a sentence you can recognize. let your backup run, then change the sample and save it again. restore the earlier version into a separate folder and open it. compare it with the sentence you expected to recover. keep your working files intact during the test.

write down which backup you used and how long recovery took. if your workflow includes more than one backup location, try restoring from each one. a successful document test establishes that recovery path for that document; larger projects and whole computers need their own checks.

use your backup tool’s restore instructions. for example, Apple documents [restoring items with Time Machine](https://support.apple.com/guide/mac-help/restore-files-mh11422/mac). an agent can help explain the steps while you check the destination and any replacement prompt yourself.

## plan for losing access

imagine your usual computer is unavailable. work through how you would find the backup and open it from another device. check whether you need an account, an encryption password, or a recovery key.

keep recovery instructions somewhere you can reach in that situation. store passwords and recovery keys securely, with a recovery route you understand. keep secret values out of project notes and agent chats. CISA’s [device protection guidance](https://www.cisa.gov/resources-tools/training/how-protect-data-stored-your-devices) includes safe storage of encryption recovery keys.

if important work lives inside an online app, check its export and account recovery options. open a sample export to see what it contains and what you could use elsewhere.

## keep it working

choose a regular time to check the latest successful backup and any failure messages. compare its contents with the list you made at the start, especially after moving files or adding an app.

repeat the restore test after meaningful setup changes. update your instructions with what worked and any gaps you found. keep enough history to recover from a mistake you discover later; check how your tool removes older copies when storage fills up.

return to [personal infrastructure](/handbook/personal-infrastructure/) to keep your notes and recurring work useful between chats.
