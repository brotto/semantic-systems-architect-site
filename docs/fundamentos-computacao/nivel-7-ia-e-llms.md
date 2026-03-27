---
sidebar_position: 9
sidebar_label: "Level 7 — AI and LLMs"
---

# Level 7 — AI and LLMs

> *"LLMs are the first machines that understand the language we already speak. For the first time, the interface between human and computer doesn't require translation — it requires architecture."*

![Fluxo de um LLM: Prompt, Tokens, Embeddings, Attention, Response](/img/fundamentos/nivel-7-llm-flow.png)

You've crossed seven layers. You understood the bit, the variable, the database, the web, client-server, infrastructure, product patterns. Each layer was a step. This level is the top of the staircase — and also the ground floor where the SSA works every day.

Everything that came before was context. This is the domain.

---

## 1. Artificial Intelligence (AI)

**Artificial Intelligence** is the field of computer science dedicated to creating systems capable of performing tasks that, when done by humans, require intelligence: recognizing patterns, making decisions, understanding language, generating content.

There are two conceptual categories:

- **Narrow AI** — systems that do one thing very well. Your email's spam filter, your phone's facial recognition, ChatGPT. Every AI that exists today is narrow.
- **Artificial General Intelligence (AGI)** — an artificial intelligence that matches or surpasses human cognitive ability across any domain. It doesn't exist yet. It is the horizon — and the debate — of the field.

**Machine Learning (ML)** is a subset of AI. Not all AI is ML, but nearly all modern AI is.

The history, compressed: in the 1950s-80s, AI meant **rules written by humans** ("if the email contains 'free', it's spam"). In the 1990s-2000s, the **statistical** approach emerged ("analyze millions of emails and calculate probabilities"). In the 2010s, deep neural networks dominated the scene (**deep learning**). In 2017, the **Transformer** appeared — and everything changed.

Analogy: imagine that "teaching a machine" evolved from writing an instruction manual (rules), to showing thousands of examples and letting the machine infer patterns (statistics), to building artificial brains with layers of processing (neural networks), to brains that understand context and long-distance relationships (Transformers).

---

## 2. Machine Learning (ML)

**Machine Learning** is the technique of making machines learn from data, rather than being explicitly programmed for every scenario.

Three fundamental paradigms:

### Supervised Learning
You provide labeled examples: "this photo is a cat, this one is a dog." The model learns to associate patterns with the correct answer. It's like teaching a child with flashcards: "this is A, this is B."

### Unsupervised Learning
You provide data without labels. The model discovers patterns on its own: groups similar customers, identifies anomalies, finds hidden structures. It's like giving someone a box of LEGO pieces with no manual — they'll organize by color, size, shape, without anyone telling them the criteria.

### Reinforcement Learning
The model learns through trial and error, receiving rewards for correct actions and penalties for mistakes. It's like training a dog: it tries actions, and the feedback shapes future behavior. AlphaGo, which defeated the world champion at Go, learned this way.

In modern practice, LLMs use a combination: supervised pre-training (predicting the next word) followed by **RLHF** (Reinforcement Learning from Human Feedback) — humans evaluate responses and the model adjusts.

---

## 3. Neural Network

A **neural network** is a mathematical structure inspired (very loosely) by the brain. It consists of **layers of artificial neurons**, where each neuron:

1. Receives input values
2. Multiplies each input by a **weight** (the importance of that connection)
3. Sums everything
4. Passes the result through an **activation function** (which decides whether the neuron "fires" or not)

Analogy: imagine a series of stacked photo filters. The first filter detects edges. The second detects shapes. The third detects objects. The fourth detects scenes. Each layer refines the signal from the previous one, transforming raw pixels into abstract understanding.

**Deep Learning** simply means "neural networks with many layers" — dozens, hundreds. The depth is what gives it the name. More layers allow more sophisticated abstractions: from edge detection to language comprehension.

The numbers are staggering: GPT-4 has hundreds of billions of **parameters** (the weights of the connections). Each parameter is a number adjusted during training. The model doesn't store facts — it stores statistical patterns encoded in those weights.

---

## 4. Transformer

The **Transformer** is the neural network architecture behind virtually every modern LLM. It was introduced in the paper *"Attention Is All You Need"* (Vaswani et al., Google, 2017) — one of the most influential papers in the history of computer science.

The central innovation is the **attention mechanism**.

Intuitively: when you read the sentence "The bank was crowded because it was lunchtime," your brain connects "bank" to "lunchtime" and understands it's a restaurant (or a crowded bank branch), not a park bench. The attention mechanism does exactly this — it allows each word to "look at" every other word in the sequence and decide which ones are relevant for determining its meaning in that context.

Why it was revolutionary:

- **Parallelization** — Previous architectures (RNNs, LSTMs) processed text word by word, sequentially. The Transformer processes everything at once, making training massively faster. This made scaling to billions of parameters feasible.
- **Long-range dependencies** — The attention mechanism connects distant words directly, without losing information along the sequence. A word at the beginning of a paragraph can influence the interpretation of a word at the end.

Without the Transformer, there would be no GPT, Claude, Llama, Gemini, nor the revolution we are living through.

---

## 5. LLM (Large Language Model)

A **Large Language Model** is a neural network model (based on Transformers) trained on massive amounts of text for a seemingly simple task: **predicting the next token**.

Given the sequence "The cat sat on the," the model calculates probabilities: "mat" (35%), "sofa" (20%), "floor" (15%)... and picks one. Then it takes "The cat sat on the mat" and predicts the next. And the next. And so on.

From this simple task — next-token prediction — something that looks like understanding emerges. The model was not programmed to answer questions, write code, or translate languages. It learned those capabilities as a byproduct of predicting text.

The major LLMs today:
- **GPT** (OpenAI) — GPT-4, o1, o3
- **Claude** (Anthropic) — Claude Opus, Sonnet, Haiku
- **Llama** (Meta) — open source
- **Gemini** (Google) — natively multimodal

What an LLM **is not**:
- **It is not a database.** It does not "store" and "retrieve" information reliably. It reconstructs answers probabilistically.
- **It is not a search engine.** It does not query the internet (unless it has a tool for that).
- **It is a probabilistic text generator.** Sophisticated, impressive, useful — but fundamentally probabilistic. Understanding this changes how you architect systems with LLMs.

---

## 6. Token

The **token** is the fundamental unit of text for an LLM. It is not a word. It is not a character. It is something in between — a unit of **subword tokenization**.

The word "understanding" might be split into tokens like: `["under", "stand", "ing"]`. Common words like "the" or "is" are usually a single token. Rare or long words are split into pieces.

Useful approximations:
- In English: **1 token ~ 4 characters** or ~ 0.75 words
- In other languages: the ratio is often less favorable — longer words with diacritics or complex morphology consume more tokens

Why tokens matter for the SSA:

- **Cost** — LLMs are priced per token (input and output). A 10,000-token prompt costs more than a 1,000-token one. Architecting efficient context is architecting efficient cost.
- **Context limits** — Each model has a maximum number of tokens it can process at once (the *context window*). Exceeding it means losing information.
- **Speed** — More tokens = more processing time. Response latency is proportional to the number of tokens generated.

When the SSA designs a 3,000-token system prompt, they are making an architectural decision with direct impact on cost, latency, and the space available for the rest of the context.

---

## 7. Context Window

The **context window** is the maximum number of tokens the model can "see" at once — including the system prompt, conversation history, injected documents, and the response it is generating.

The evolution has been dramatic:
- **GPT-3 (2020):** 4K tokens (~3,000 words)
- **GPT-3.5 (2023):** 4K-16K tokens
- **GPT-4 (2023):** 8K-128K tokens
- **Claude 3 (2024):** 200K tokens (~150,000 words — an entire book)
- **Gemini 1.5 (2024):** 1M+ tokens

Analogy: the context window is the model's "desk." A 4K-token desk fits a single sheet of paper. A 200K-token desk fits an entire bookshelf of documents. The model only reasons about what is on the desk.

For the SSA, this is critical: **the larger the window, the more context you can architect**. More examples, more constraints, more reference documentation. But be careful — large windows don't mean uniform attention. Models tend to pay more attention to the beginning and end of the context (the "lost in the middle" phenomenon). The SSA needs to know not only *how much* fits, but *where* to position each piece of information.

---

## 8. Prompt

The **prompt** is the input you send to the model. It is the SSA's primary architectural artifact.

The modern structure for interacting with LLMs uses three **roles**:

- **System** — the system prompt. Defines personality, rules, constraints, response format. It is the agent's "constitution." Sent once, it shapes the entire interaction.
- **User** — the user's message. The question, the request, the input.
- **Assistant** — the model's response. Can be pre-filled to guide the format.

The fundamental point: **prompt design is not writing — it is architecture**. A well-designed system prompt is a semantic contract. It defines behavior, establishes boundaries, injects knowledge, controls format. Every word has computational consequences. This is the SSA's central craft.

---

## 9. Temperature

**Temperature** is a parameter that controls the randomness of text generation.

- **Temperature 0** — the model always picks the most probable token. Deterministic output. Same question, same answer. Ideal for tasks requiring precision: data extraction, classification, calculations.
- **Temperature 0.3-0.7** — a balance between coherence and variety. Good for most tasks.
- **Temperature 1.0+** — the model distributes probability more evenly. More creative outputs, but also more unpredictable. Ideal for brainstorming, creative writing, generating variations.

Analogy: imagine you ask someone to complete the sentence "The sky is...". At temperature 0, the answer is always "blue." At temperature 0.5, it might be "blue," "vast," or "infinite." At temperature 1.0, it might be "a silent invitation" — poetic, unexpected, but potentially irrelevant.

For the SSA, temperature is an architectural decision. Extracting data from a contract? Temperature 0. Generating creative suggestions? Temperature 0.7. The wrong choice produces either unnecessary rigidity or dangerous instability.

---

## 10. Top-p and Top-k

Beyond temperature, there are other parameters that control **sampling**:

- **Top-k** — The model considers only the *k* most probable tokens. If k=50, it ignores every token outside the top 50, no matter how eligible temperature might make them. It's a hard cutoff: "choose among the 50 best candidates."

- **Top-p (nucleus sampling)** — The model considers tokens whose cumulative probability sums to *p*. If p=0.9, it includes tokens until the probability sum reaches 90%. It's an adaptive cutoff: in obvious contexts (few good options), it considers fewer tokens; in open contexts, it considers more.

In practice, top-p is used more than top-k. Most APIs use top-p=1.0 (no filter) combined with temperature as the primary control. The SSA needs to know these parameters exist because they appear in agent and pipeline configurations — and because poorly calibrated values are a common source of erratic behavior.

---

## 11. Fine-tuning

**Fine-tuning** is the process of adapting a pre-trained model to specific data or tasks by continuing training with new, targeted examples.

The pre-trained model (GPT-4, Claude, etc.) is a generalist — it knows a little about everything. Fine-tuning specializes it: training with thousands of medical support examples produces a model that responds better about health. Training with legal code examples produces a model that better understands legal language.

**When to fine-tune:**
- You need a very specific style or format that prompts can't reliably guarantee
- You have proprietary data in volume (thousands of examples)
- Latency and cost are critical (fine-tuned models can be smaller and faster)

**When NOT to fine-tune (and use prompts/RAG instead):**
- Your data changes frequently (fine-tuning is static)
- You have few examples (less than hundreds)
- Prompt engineering solves the problem (it usually does)

Fine-tuning is expensive, complex, and introduces risks (the model can "forget" general capabilities — *catastrophic forgetting*). In most practical scenarios, **RAG + good prompts** solves the problem better, cheaper, and faster.

---

## 12. Embedding

An **embedding** is the numerical representation of a concept — the conversion of text (or images, or audio) into a **vector**: a list of numbers that captures meaning.

The word "king" becomes something like `[0.23, -0.45, 0.78, ...]` — hundreds or thousands of numbers. The crucial point: **words with similar meanings end up close together in vector space**.

The classic example that illustrates the power of embeddings:

> `vector("king") - vector("man") + vector("woman") ~ vector("queen")`

This works because the model encoded semantic relationships — gender, hierarchy, profession — as directions in vector space. "King" is to "man" as "queen" is to "woman," and this relationship is captured geometrically.

Analogy: imagine a map where each concept is a point. "Dog" and "cat" are close (both are domestic animals). "Dog" and "democracy" are far apart. The distance on the map is semantic distance. Embeddings are the coordinates of each concept on this map.

**Vector databases** (Pinecone, Weaviate, Qdrant, Chroma) store these vectors and enable similarity search: "give me the 10 documents most semantically similar to this question." This is the foundation of RAG.

---

## 13. RAG (Retrieval-Augmented Generation)

**RAG** is an architectural pattern that combines information retrieval with LLM generation. It is one of the most important architectures the SSA designs.

The flow:

1. **Query** — The user asks a question
2. **Retrieve** — The system searches for relevant documents in a vector database (using embeddings to find semantic similarity)
3. **Augment** — The retrieved documents are injected into the prompt as context
4. **Generate** — The LLM generates a response based on the provided documents

Why RAG exists:

- **It addresses hallucination** — The model responds based on real documents, not probabilistic memory. If the information isn't in the documents, the system can say "I don't know."
- **It addresses freshness** — The model was trained up to a cutoff date. RAG allows access to up-to-date information without retraining.
- **It addresses knowledge scale** — No context window is large enough for an entire company's knowledge base. RAG selects only what is relevant.

The SSA who designs RAG systems needs to understand: how to segment documents (*chunking*), how to define chunk size, how to choose the embedding model, how to calibrate the number of retrieved documents, how to position them in the prompt. Each decision affects response quality.

---

## 14. Hallucination

**Hallucination** is when the model generates information that seems plausible, coherent, and confident — but is factually false.

The model can cite a scientific paper that doesn't exist, invent a law with a number and date, or attribute a quote to someone who never said it. And it does all of this with the same fluency it uses when generating true information.

Why this happens: the LLM doesn't "know" things — it predicts probable sequences of tokens. If the sequence "According to the study published in Nature in 2019 by Smith et al." is statistically probable given the context, the model generates it. There is no internal verification of truth. There is no consultable factual memory. There is probability.

**Grounding strategies:**
- **RAG** — provide reference documents and instruct the model to base its responses on them
- **Mandatory citation** — require the model to cite the source of each claim
- **Cross-verification** — use a second model or process to validate claims
- **Scope restriction** — explicitly instruct: "If you don't find it in the provided documents, respond 'I don't have enough information'"

For the SSA, hallucination is not a bug — it is a fundamental property of the system. Architecting against it is part of the job.

---

## 15. Agent (AI Agent)

An **AI agent** is an LLM equipped with **tools** and capable of executing actions in the real world — not just generating text.

The fundamental loop of an agent:

1. **Think** — The model analyzes the task and decides what to do
2. **Act** — The model calls a tool (web search, database query, send email, execute code)
3. **Observe** — The model receives the tool's result
4. **Repeat** — Based on the observation, it decides whether to act again or respond

An agent that needs to answer "What's the current dollar exchange rate?" might: (1) think "I need to search the web for this," (2) call the search tool, (3) observe the result "$1.08 to the euro," (4) respond to the user.

**Multi-agent systems** take this further: multiple agents with different roles (researcher, writer, reviewer, executor) collaborate to solve complex tasks. One agent researches, another analyzes, another writes, another validates.

This is the territory where the SSA operates directly. Designing an agent means designing: its role, its tools, its constraints, its success criteria, its failure modes. It is semantic systems architecture in its most complete form.

---

## 16. Function Calling / Tool Use

**Function calling** (or *tool use*) is the mechanism by which an LLM interacts with external systems. The model doesn't execute code directly — it generates a **structured call** that an intermediary system executes.

A tool's contract has four parts:

- **Name** — the tool's identifier (`search_customer`)
- **Description** — what the tool does (in natural language — the model reads this to decide when to use it)
- **Parameters** — the expected inputs, with types and descriptions (`cpf: string, required`)
- **Return** — what the tool returns (`Customer object with name, email, status`)

The model receives the list of available tools and, when it deems necessary, generates a structured JSON requesting execution. The orchestration system executes the call and returns the result to the model.

For the SSA, this is the most critical integration point. The quality of tool descriptions determines whether the model uses them correctly. Ambiguous names, vague descriptions, or poorly typed parameters generate errors. **Designing tools for agents is designing semantic interfaces** — contracts of meaning that the machine must interpret correctly.

---

## 17. Eval (Evaluation)

**Eval** is the systematic process of measuring the quality of an AI system. "Seems good" is not a metric — it's wishful thinking.

Types of evaluation:

- **Automated evaluation** — Computable metrics: accuracy, precision, recall, F1-score, BLEU, ROUGE. These compare the model's output with an expected answer.
- **LLM-as-judge evaluation** — A second model evaluates the first model's output. "Is this response factually correct? On a scale of 1 to 5, how good is it?" More flexible, but subject to the same biases.
- **Human evaluation** — Experts assess the responses. The gold standard, but expensive and slow.
- **Benchmarks** — Standardized test sets (MMLU, HumanEval, HellaSwag) that allow comparing models against each other.

For the SSA, eval is non-negotiable. You designed a system prompt? Measure it. Changed the temperature? Measure it. Swapped the model? Measure it. Without eval, you don't know whether the change improved or worsened the system — you merely think so.

A robust **eval suite** includes: representative test cases, clear success/failure criteria, quantifiable metrics, and automated execution. The SSA designs eval suites as an integral part of the architecture, not as an afterthought.

---

## 18. Guardrails

**Guardrails** are the safety and control mechanisms that constrain the behavior of an AI system.

Categories:

- **Input filters** — Block or transform malicious inputs before they reach the model. Detection of prompt injection, toxic content, jailbreak attempts.
- **Output validation** — Verify that the model's response meets criteria before delivering it to the user. Correct format? No sensitive information leaked? Within the authorized scope?
- **Circuit breakers** — Mechanisms that halt execution when something goes off the rails. If the agent is in a loop, if cost has exceeded the limit, if confidence has dropped below the minimum.
- **Semantic guardrails** — Constraints embedded in the system prompt: "never recommend medications," "always include a legal disclaimer," "if uncertain, escalate to a human."

**Responsible AI** is not an addendum — it is an architectural layer. The SSA designs guardrails from the start: what are the system's risks? What happens when the model is wrong? Who gets notified? What is the fallback? These are architecture decisions, not compliance checkboxes.

---

## Why the SSA needs to know this

This level is not context. It is the center.

Everything you learned in levels 0 through 6 — bits, variables, databases, APIs, infrastructure, product patterns — was building the stage. This level is the play that unfolds on it.

The SSA is the **architect of the semantic layer** that connects human intention to LLM execution. This means:

- **Understanding tokens** is understanding costs and constraints. Every context decision has a price.
- **Understanding embeddings** is understanding how RAG works. Without this, there is no knowledge architecture.
- **Understanding agents** is understanding the systems the SSA designs. The agent is the central artifact.
- **Understanding temperature and sampling** is controlling system behavior with precision.
- **Understanding eval** is the difference between thinking it works and knowing it works.
- **Understanding guardrails** is the difference between a system that helps and one that causes harm.
- **Understanding prompt as architecture** is the SSA's central thesis: natural language as a first-class engineering interface.

The previous levels were "why the machine works." This level is "how the SSA makes it work with meaning."

You now have the complete vocabulary. Every term in this module is a tool in the semantic architect's arsenal. Use them with the precision they deserve.

---

## Mini-glossary

| Term | Definition |
|:-----|:-----------|
| **Artificial Intelligence (AI)** | Field dedicated to creating systems that perform tasks requiring intelligence when done by humans |
| **Narrow AI** | AI specialized in a specific task (all current AI) |
| **AGI** | Artificial General Intelligence — cognitive ability equivalent to humans across any domain (still theoretical) |
| **Machine Learning (ML)** | Subset of AI where machines learn from data instead of explicit rules |
| **Supervised Learning** | Training with labeled examples (input + correct answer) |
| **Unsupervised Learning** | Training without labels — the model discovers patterns on its own |
| **Reinforcement Learning** | Training through trial, error, and reward |
| **RLHF** | Reinforcement Learning from Human Feedback — fine-tuning with human evaluation |
| **Neural Network** | Mathematical structure with layers of neurons that transform inputs into outputs |
| **Deep Learning** | Neural networks with many (deep) layers |
| **Parameter** | Each adjustable numerical weight in the neural network |
| **Transformer** | Attention-based neural network architecture, the foundation of all modern LLMs |
| **Attention Mechanism** | Technique that allows the model to relate each element to all others in the sequence |
| **LLM** | Large Language Model — a large-scale language model, a probabilistic text generator |
| **Token** | Unit of text processed by the model (subword). ~4 chars in English |
| **Context Window** | Maximum number of tokens the model processes at once |
| **Prompt** | Input sent to the model (system, user, assistant) |
| **System Prompt** | Instruction that defines the model's behavior, rules, and constraints |
| **Temperature** | Parameter that controls generation randomness (0 = deterministic, 1 = creative) |
| **Top-p** | Nucleus sampling — considers tokens until cumulative probability reaches p |
| **Top-k** | Considers only the k most probable tokens |
| **Fine-tuning** | Adapting a pre-trained model with specific data |
| **Embedding** | Numerical representation (vector) of a text's meaning |
| **Vector Database** | Stores embeddings and enables semantic similarity search |
| **RAG** | Retrieval-Augmented Generation — retrieve relevant documents and inject them as context |
| **Chunking** | Segmenting documents into smaller pieces for indexing in RAG |
| **Hallucination** | Generation of plausible but factually false information |
| **Grounding** | Strategies for anchoring model responses in real data |
| **Agent (AI Agent)** | LLM with tools, capable of executing actions (think, act, observe) |
| **Multi-agent** | System with multiple agents collaborating in distinct roles |
| **Function Calling** | Mechanism by which the LLM requests execution of external tools via structured calls |
| **Tool Use** | Synonym for function calling — the model's use of tools |
| **Eval** | Systematic evaluation of an AI system's quality |
| **Eval Suite** | Structured set of tests, criteria, and metrics for evaluating a system |
| **Benchmark** | Standardized test set for comparing models |
| **Guardrails** | Safety mechanisms that constrain system behavior |
| **Prompt Injection** | Attack where malicious input attempts to subvert the system prompt's instructions |
| **Circuit Breaker** | Mechanism that halts execution when anomalous conditions are detected |
