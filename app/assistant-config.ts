export let assistantId = "asst_sQwg1YZCUY4Nx8SviivtokDm"; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
