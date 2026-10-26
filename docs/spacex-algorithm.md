# The SpaceX 5-Step Engineering Algorithm in Code

Lauren Tan (@poteto)'s `pstack` codifies Elon Musk's 5-step engineering process into agent invariants:

1. **Make Requirements Less Dumb:** Question the prompt. If a requirement doesn't earn its place, push back.
2. **Delete the Part or Process:** Subtract dead abstractions, unused exports, and corpse code before adding features.
3. **Simplify or Optimize:** Bias toward deletion and minimal sufficient diffs (Laziness Protocol).
4. **Accelerate Cycle Time:** Write standalone reproduction scripts first; prove fixes against real runtimes.
5. **Automate (Build the Lever):** Build scripts, codemods, and generators instead of doing repetitive manual work.
