# Wasm-Webtoy
A tool for making online web assembly game in your browser from .WAT.

## Features
- Just a straight web compiler of Web Assembly to show off in your browser.
- Uses WASM-4 for game rendering: https://wasm4.org/
- AssemblyScript's wabt.js for real-time compilation: https://github.com/AssemblyScript/wabt.js

## Problems
- No real input sanitization, you can just put in whatever you want here and it'll compile and execute real web assembly. It's a fancier version of calling `eval()` on whatever's been written. 
  - Not an input sanitization expert, so I'm leaving it be for right now. You'd have to be pretty determined to write malicious JS in web assembly and then have them paste it into a web toy. 
- TODO: Better CSS for editing
- TODO: Better text editor
- TODO: Being able to still see your game while editing
- I hacked this together in a night