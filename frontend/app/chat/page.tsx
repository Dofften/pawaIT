import Sidebar from "@/components/sidebar";
import Textarea from "@/components/textarea";
import Chatbubble from "@/components/chatbubble";

export default function chat() {
  return (
    <div className="flex h-screen">
      <div className="w-1/6 flex-shrink-0">
        <Sidebar username="Dofften" />
      </div>

      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto bg-white p-4 min-h-0">
          <div className="space-y-4">
            <Chatbubble
              side="right"
              message="Hello there!"
              name="Frank"
              time="12:00"
              status="online"
            />
            <Chatbubble
              side="left"
              message="Hey! How's it going?"
              name="Gemini"
              time="12:17"
              status="delivered"
            />
            <Chatbubble
              side="right"
              message="Are you sure!"
              name="Frank"
              time="12:03"
              status="delivered"
            />
            <Chatbubble
              side="left"
              message="Yep — pretty sure 🙂. What's on your mind?"
              name="Gemini"
              time="12:06"
              status="online"
            />
            <Chatbubble
              side="right"
              message="I am working on a secrete ai project"
              name="Frank"
              time="12:06"
              status="online"
            />
            <Chatbubble
              side="left"
              message="Ooo, a *secret AI project* 👀 That sounds exciting. Are you keeping it fully under wraps, or can you give me a hint about what area it’s in—like language, vision, robotics, or something else?"
              name="Gemini"
              time="12:10"
              status="delivered"
            />
            <Chatbubble
              side="right"
              message="just an llm"
              name="Frank"
              time="12:12"
              status="delivered"
            />
            <Chatbubble
              side="left"
              message="Nice 😎 building an LLM is no small task. Are you training one from scratch, fine-tuning an existing model, or experimenting with something in between?"
              name="Gemini"
              time="12:12"
              status="delivered"
            />
            <Chatbubble
              side="right"
              message="do you think I can?"
              name="Frank"
              time="12:17"
              status="delivered"
            />
            <Chatbubble
              side="left"
              message="I'd say yes — it's definitely possible, but *how feasible* depends on your goals and resources.
                * **From scratch** → Training a frontier-scale LLM takes insane compute (hundreds of GPUs for months), a massive dataset, and serious engineering. Not realistic unless you've got deep pockets or a research lab behind you.
                * **Smaller from scratch** → You *can* train small LLMs (tens to hundreds of millions of parameters) on modest hardware, just to understand the process.
                * **Fine-tuning existing models** → Much more doable! With techniques like LoRA or QLoRA, you can adapt powerful open-source models (LLaMA, Mistral, etc.) to your domain on a single decent GPU (or even rented cloud GPUs).
                * **Experimentation & custom pipelines** → You could also build novel prompting systems, retrieval-augmented generation (RAG), or specialized agents around existing models without retraining the base model.

                So yes—you absolutely *can*, but the path depends on whether you're aiming to **learn, prototype, or compete with the big guys**.

                👉 Do you want to go for the *learning-by-doing* route, or are you aiming for something more ambitious?
                "
              name="Gemini"
              time="12:20"
              status="delivered"
            />
          </div>
        </div>

        <div className="h-24 bg-transparent flex-shrink-0 p-3 bg-white">
          <Textarea />
        </div>
      </div>
    </div>
  );
}
