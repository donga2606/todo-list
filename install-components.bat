@REM @echo off
@REM SETLOCAL ENABLEDELAYEDEXPANSION

@REM REM Components
@REM set components=accordion alert alert-dialog aspect-ratio avatar badge button calendar card checkbox collapsible combobox command context-menu data-table date-picker dialog dropdown-menu form hover-card input label menubar navigation-menu popover progress radio-group scroll-area select separator sheet skeleton slider switch table tabs textarea toast toggle tooltip


@REM REM Loop through each component and install it
@REM for %%c in (%components%) do (
@REM     echo Installing %%c...
@REM     echo yes | npx shadcn-ui@latest add %%c
@REM     echo %%c installed!
@REM     echo export * from "./%%c.tsx";>>./src/components/ui/index.ts
@REM )

@REM echo All components installed successfully!