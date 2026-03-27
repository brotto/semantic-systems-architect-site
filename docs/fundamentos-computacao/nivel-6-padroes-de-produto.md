---
sidebar_position: 8
sidebar_label: "Level 6 — Product Patterns"
---

# Level 6 — Product Patterns

> *"Patterns are the vocabulary of how software organizes itself to serve people. Without that vocabulary, the architect designs in the dark."*

![Modelos de serviço cloud: IaaS, PaaS, SaaS](/img/fundamentos/nivel-6-saas-paas-iaas.png)

Up to this point, you've understood the machine, the code, the data, the web, client-server communication, and infrastructure. Now we arrive at the layer where all of that **crystallizes into product** — where architectural decisions determine how millions of people will use a piece of software, how developers will build it, and how systems will protect themselves and communicate with each other.

This level covers three broad territories: **delivery models** (how software reaches the user), **organizational patterns** (how software is structured internally), and **security and integration mechanisms** (how systems protect themselves and talk to each other).

---

## 1. SaaS (Software as a Service)

**Software as a Service.** You open a browser, log in, and use it. You don't install anything. You don't update anything. You don't worry about the server it runs on.

Google Docs, Slack, Salesforce, Notion, Figma — all of these are SaaS. You pay a subscription (monthly or annual) and get access to the software for as long as you keep paying.

**Analogy:** Renting a fully furnished apartment. You walk in, open the door, and everything is ready — bed, stove, Wi-Fi. You don't need to buy anything. If the plumbing breaks, the landlord fixes it. But you can't knock down walls.

From a technical standpoint, SaaS is software running on cloud servers (Level 5), accessed via a browser (Level 3), through HTTP requests (Level 4). Each user accesses the same application but sees only their own data — this isolation is called **multi-tenancy** (multiple tenants in the same building).

**Fundamental characteristics:**
- **No installation:** works in the browser
- **Subscription model:** recurring revenue
- **Automatic updates:** all users receive the latest version simultaneously
- **Scalability:** the provider handles supporting more users

---

## 2. PaaS (Platform as a Service)

**Platform as a Service.** Here, you're not using a ready-made software product — you're using a **platform to build and run** your own software.

Heroku, Vercel, Railway, Render — these are examples. You hand over your code, and the platform takes care of everything else: server, operating system, networking, scalability, deployment.

**Analogy:** Renting a commercial kitchen to run your restaurant. The stove, the pots, the fridge, the gas — everything is already there. You bring your recipes and your ingredients. You don't need to build the kitchen or know how to maintain the stove. But you choose exactly what to cook.

PaaS eliminates the need to manage infrastructure (Level 5) directly. The developer focuses on the code; the platform handles containers, deployment, SSL certificates, and load balancing.

**When to use PaaS:** projects that need to go live quickly, small teams that don't want (or can't) maintain infrastructure, prototypes and MVPs.

---

## 3. IaaS (Infrastructure as a Service)

**Infrastructure as a Service.** The lowest level of the three. Here, you receive the **fundamental building blocks** — virtual servers, storage, networking — and build everything on top.

AWS EC2, Google Compute Engine, Azure Virtual Machines — these are IaaS. You choose how much CPU, RAM, and disk you want, and you get a virtual machine ready to go. What you install on it, how you configure it, how you secure it — that's all your responsibility.

**Analogy:** Renting an empty lot to build whatever you want. The lot has water and electricity. But the blueprint, the construction, the maintenance — all of that is on you.

**The hierarchy becomes clear:**

| Model | You control | The provider controls |
|--------|------------|---------------------|
| **IaaS** | Everything above the virtual hardware | Physical hardware, network, power |
| **PaaS** | Application code | Everything below (OS, runtime, infra) |
| **SaaS** | Only settings and data | Everything (infra, code, interface) |

The higher you go on this scale, the less control you have — but the less responsibility, too.

---

## 4. MVC (Model-View-Controller)

MVC is the **most influential architectural pattern** in the history of web development. It divides an application into three clearly separated responsibilities.

- **Model:** the data and business rules. What the system *knows*.
- **View:** the interface the user sees. What the system *shows*.
- **Controller:** the logic connecting the two. What the system *does* when the user acts.

**Analogy:** A restaurant. The **kitchen** is the Model — that's where the ingredients, the recipes, and the preparation live. The **dining room** is the View — it's what the customer sees, the set table, the plated dish. The **waiter** is the Controller — takes the order from the customer (View), brings it to the kitchen (Model), and delivers the result back to the dining room.

When you click "submit" on a web form:
1. The **Controller** receives the action
2. Calls the **Model** to process/save the data
3. Updates the **View** with the result

Entire frameworks are built on this pattern: Ruby on Rails, Django, Laravel, Spring. Even modern frameworks like Next.js maintain this separation of concerns, albeit with different names.

**Why it matters:** MVC is not just code organization — it is a **philosophy of separation of concerns**. Each part has a single responsibility. This makes the system easier to understand, test, and maintain.

---

## 5. Monolith vs Microservice

This is one of the most important architectural decisions in any system — and one of the most debated.

### Monolith

A **monolith** is a single application that does everything. All the code — authentication, order processing, email sending, report generation — lives in a single project, a single deployment, a single server (or cluster of servers running the same thing).

**Analogy:** A department store. Everything under one roof: clothing, electronics, food, cosmetics. One administration, one entrance, one checkout.

**Advantages:** simplicity of development, single deployment, fast internal communication (everything is in the same process).

**Disadvantages:** if one part breaks, everything can go down. Hard to scale just one specific feature. The codebase tends to grow and become difficult to maintain.

### Microservice

A **microservice** architecture splits the application into many small, independent services, each responsible for a single capability. The authentication service is separate from the payment service, which is separate from the notification service.

**Analogy:** A shopping mall. Each store is independent: it has its own inventory, its own staff, its own register. If the shoe store closes for renovation, the food court keeps running.

**Advantages:** independent scalability, autonomous teams, isolated failures.

**Disadvantages:** much greater operational complexity, inter-service communication over the network (slower, more fragile), difficulty maintaining data consistency.

**Rule of thumb:** start with a monolith. Migrate to microservices when complexity and scale justify it. Most systems will never need microservices — and many that migrated too early regretted it.

---

## 6. Authentication

**Authentication** answers the question: *"Who are you?"*

It is the process of verifying the identity of whoever is trying to access a system. The most common mechanism is the **username + password** pair — but there are additional layers.

### Authentication factors

The security of authentication is measured by **factors** — independent categories of proof:

1. **Something you know** — password, PIN, secret answer
2. **Something you have** — phone, physical token, security key
3. **Something you are** — fingerprint, facial recognition, iris scan

**MFA (Multi-Factor Authentication)** or **2FA (Two-Factor Authentication)** combines two or more factors. When your bank asks for your password (factor 1) AND a code sent by SMS (factor 2), that's 2FA.

### The login flow

1. User sends credentials (email + password)
2. The server verifies whether the credentials are correct
3. If correct, the server creates a **session** or issues a **token** (we'll see JWT shortly)
4. The browser stores that token and sends it with every subsequent request
5. The server recognizes the token and knows who is making the request

The password is never stored in plain text — it goes through a process called **hashing** (an irreversible transformation). The server doesn't know your password; it only knows the hash result, and it compares.

---

## 7. Authorization

**Authorization** answers the question: *"What are you allowed to do?"*

Authentication and authorization are frequently confused, but they are distinct concepts. First you prove who you are (authentication). Then the system checks what you have permission to do (authorization).

### RBAC (Role-Based Access Control)

The most common pattern is **role-based access control**. Each user is assigned one or more **roles**, and each role has associated **permissions**.

| Role | Permissions |
|------|-----------|
| **Viewer** | Read only |
| **Editor** | Read + write |
| **Admin** | Read + write + user management |
| **Owner** | Everything, including deleting the project |

When a user tries to perform an action, the system checks: *does this role have permission for this operation on this resource?*

**Concrete example:** In Google Docs, you can share a document as "Viewer," "Commenter," or "Editor." That's role-based authorization.

Authorization can be even more granular — by resource, by field, by time of day. But RBAC is the pattern that covers 90% of cases.

---

## 8. OAuth 2.0

Have you ever clicked **"Sign in with Google"** or **"Login with GitHub"**? That's OAuth 2.0.

OAuth is a **delegated authorization** protocol. It allows an application to access resources on behalf of a user without the user having to share their password with that application.

### How it works (simplified)

1. You click "Sign in with Google" on application X
2. Application X redirects you to Google
3. Google asks: "Application X wants to access your name and email. Authorize?"
4. You authorize
5. Google sends an **authorization code** back to application X
6. Application X exchanges that code for an **access token**
7. With that token, application X can access your data on Google (only what you authorized)

**Analogy:** A hotel key card. When you check in, the receptionist (Google) verifies your identity and issues a magnetic card (access token). That card opens your room and the spa elevator — but it doesn't open other rooms or the hotel kitchen. And it has an expiration date: at checkout, it stops working.

**Key concepts:**
- **Access Token:** a temporary credential that grants access
- **Refresh Token:** allows obtaining a new access token without asking the user to log in again
- **Scopes:** define exactly what the token permits (e.g., "read email" but not "send email")

---

## 9. JWT (JSON Web Token)

The JWT (pronounced "jot") is a **self-contained token** format — it carries within itself all the information needed to validate the bearer's identity and permissions.

### Structure

A JWT has three parts, separated by dots:

```
header.payload.signature
```

- **Header:** declares the token type and signing algorithm
- **Payload:** contains the data (claims) — who the user is, when the token expires, what permissions they have
- **Signature:** a cryptographic signature that guarantees the token has not been tampered with

**Analogy:** A sealed letter with a wax seal. Anyone can read the contents of the letter (the payload is not encrypted — only Base64-encoded). But the wax seal (signature) guarantees that nobody altered the contents after the sender sealed it. If the seal is intact, you can trust the letter.

### Why it's revolutionary

JWT enables **stateless authentication** — the server doesn't need to maintain a list of active sessions. Each request carries its own proof of identity. The server simply verifies the signature.

This is fundamental for distributed systems and microservices: there is no need for a central session database. Each service can validate the token independently.

**Caution:** the JWT payload is readable by anyone. Never put sensitive information (passwords, credit card data) inside a JWT.

---

## 10. API Key

The **API Key** is the simplest authentication mechanism between services. It's a long, random string that identifies who is making the request.

When you use the OpenAI or Anthropic API, you send an API Key with every request. That key tells the server: "this request comes from user X, on account Y, with plan Z."

```
Authorization: Bearer sk-abc123...
```

**Difference from OAuth:** the API Key is static and long-lived. There is no authorization flow — whoever has the key has access. That's why API Keys are used for **service-to-service** communication, not for end-user authentication.

**Best practices:**
- Never expose API Keys in public code (GitHub repositories)
- Use environment variables to store them
- Rotate keys periodically
- Each service or environment should have its own key

**Why AI providers use API Keys:** simplicity. When an AI agent needs to access an API, it can't "log in" with an email and password. An API Key is the most direct mechanism for machine-to-machine authentication.

---

## 11. Webhook

Already introduced in Level 4, the webhook deserves deeper treatment here because of its central role in modern architectures.

A **webhook** is a URL that receives an automatic notification when an event occurs. Instead of you repeatedly asking "did something happen?" (polling), the system notifies you when something relevant occurs.

### Advanced patterns

**Retries:** If your server is down when the webhook arrives, the sender tries again — usually with **exponential backoff** (waits 1s, then 2s, then 4s, then 8s...).

**Idempotency:** The same notification may arrive more than once (because of retries). Your system needs to be **idempotent** — processing the same message twice should have the same effect as processing it once. If a webhook says "payment confirmed," confirming it twice should not charge the customer twice.

**Signature verification:** How do you know the webhook came from who it claims to be from? The sender signs the request with a shared secret key. The receiver verifies the signature before processing.

**Usage examples:**
- Stripe sends a webhook when a payment is confirmed
- GitHub sends a webhook when there's a push to the repository
- Slack sends a webhook when someone mentions your bot

---

## 12. Queue and Message Broker

Not everything needs to happen immediately. Many operations — sending emails, generating reports, processing images, indexing documents — can (and should) be done **asynchronously**.

**Analogy:** The difference between a phone call and a letter sent by mail. On a phone call (synchronous communication), both parties need to be available at the same time. With a letter (asynchronous communication), the sender drops it in the mailbox and goes on with their life. The recipient processes it when they can.

### How it works

A **queue** is exactly that: a channel where messages are deposited by **producers** and consumed by **consumers**.

1. The **producer** places a message on the queue ("process image ABC")
2. The message sits on the queue until a **consumer** is available
3. The **consumer** picks up the message, performs the work, and confirms (acknowledges) that it's done
4. If the consumer fails, the message goes back on the queue and another consumer tries

A **message broker** is the system that manages these queues. The most well-known:

- **RabbitMQ:** classic broker, robust, supports multiple routing patterns
- **Amazon SQS:** managed queue on AWS, simple and scalable
- **Apache Kafka:** designed for extremely high-volume data streams — more than a queue, it's an event streaming platform

### Why not do everything synchronously?

Imagine an e-commerce site. When the customer completes a purchase, the system needs to: charge the card, send a confirmation email, update inventory, notify the logistics partner, generate an invoice. If everything is synchronous, the customer stares at a loading screen for 30 seconds. With queues, the system charges the card (synchronous — the customer needs to know immediately) and puts everything else on the queue for background processing.

---

## 13. Cache

**Cache** is the principle of keeping frequently accessed data in a faster place to reach.

**Analogy:** You like to cook. Salt, olive oil, pepper — you use them in almost every recipe. Where do they live? On the counter, within arm's reach. Not in the back cupboard, behind three pots. The back cupboard is your database. The counter is your cache.

### How it works

1. The system receives a request ("give me the profile of user 42")
2. First, it checks the cache. If the data is there (**cache hit**), it returns immediately — without touching the database
3. If it's not there (**cache miss**), it fetches from the database, returns it to the user, and stores it in the cache for next time

### Tools

- **Redis:** the most popular cache. An in-memory database, extremely fast (sub-millisecond). It also serves as a message broker, session store, and much more.
- **Memcached:** simpler than Redis, focused exclusively on key-value caching.

### TTL (Time to Live)

Every piece of cached data has an **expiration** — the TTL. After that time, the data expires and is fetched again from the database. This ensures the cache doesn't serve stale information indefinitely.

### Cache Invalidation

> *"There are only two hard things in computer science: cache invalidation and naming things."* — Phil Karlton

**Cache invalidation** is the process of removing or updating data in the cache when the original source changes. If user 42 updates their name, the cache needs to know — otherwise, it will keep serving the old name.

Common strategies:
- **Short TTL:** the data expires quickly and refreshes naturally
- **Explicit invalidation:** when the data changes, the system deletes the cache entry
- **Write-through:** every write simultaneously updates both the database and the cache

---

## 14. Feature Flag

A **feature flag** is a mechanism for turning features of a software application on or off **without deploying new code**.

Imagine you've developed a new checkout interface. Instead of launching it for all 500,000 users at once, you:

1. Place the feature behind a flag
2. Turn it on for 1% of users (gradual rollout)
3. Monitor errors and metrics
4. If everything looks good, increase to 10%, 50%, 100%
5. If something goes wrong, turn off the flag instantly — no deployment needed

### Uses beyond gradual rollout

- **A/B Testing:** half the users see the blue button, half see the green button. Which one converts more?
- **Kill switch:** disable a problematic feature in production within seconds
- **Features by plan:** free users see features X, premium users see X + Y
- **Features by region:** feature available only in certain countries

Tools like LaunchDarkly, Flagsmith, and Unleash specialize in feature flags. But the simplest implementation is an `if/else` that checks an external configuration.

---

## 15. API Versioning

APIs evolve. New fields are added, formats change, features are removed. But the systems consuming your API can't break every time you change something.

**API versioning** is the practice of keeping multiple versions of your API available simultaneously.

```
https://api.example.com/v1/users
https://api.example.com/v2/users
```

### Breaking changes

A **breaking change** is any modification that causes existing clients to stop working. Examples:

- Removing a field that existed in the response
- Changing a field's type (from string to number)
- Altering an endpoint's URL
- Changing the authentication format

### How it works in practice

1. **v1** is the stable version, used by hundreds of clients
2. You develop improvements that involve breaking changes
3. You release them as **v2**, keeping v1 running
4. You communicate to clients: "v2 is available. v1 will be discontinued in 12 months"
5. After the migration period, v1 is turned off

**Semantic pattern:** many APIs follow **SemVer** (Semantic Versioning): `MAJOR.MINOR.PATCH`. Changes to MAJOR indicate breaking changes. Changes to MINOR add features without breaking anything. PATCH fixes bugs.

---

## 16. Open Source

**Open source** means that a software's source code is **publicly accessible** — anyone can read, study, modify, and (depending on the license) redistribute it.

### Main licenses

Not all open source is created equal. The **license** defines what you can and cannot do:

| License | What it allows | Main restriction |
|---------|---------------|-----------------|
| **MIT** | Almost anything — use, modify, sell | Keep the copyright notice |
| **Apache 2.0** | Similar to MIT + patent protection | Keep the copyright and license notice |
| **GPL** | Use, modify, distribute | Derivative works must also be GPL (copyleft) |

**MIT** is the most permissive — do what you want, just keep the credit. **GPL** is the most restrictive — if you use GPL code in your software, your software must also be GPL (open source).

### Why most AI tools are open source

- **Adoption:** open source massively accelerates adoption. PyTorch, TensorFlow, LangChain, LlamaIndex — all open source.
- **Community:** thousands of developers contribute, find bugs, add features
- **Trust:** auditable code generates more trust, especially in AI
- **Ecosystem:** models like LLaMA (Meta), Mistral, and Stable Diffusion are open source, allowing anyone to run, modify, and specialize them
- **Business model:** many companies open-source the core and monetize with services (hosting, support, enterprise features) — the **open core** model

The open source movement transformed the software industry. Virtually all modern internet infrastructure — Linux, PostgreSQL, Nginx, Kubernetes, Git — is open source.

---

## Why the SSA needs to know this

The Semantic Systems Architect does not implement these patterns — they **specify, combine, and orchestrate** them. Every concept in this level is an architectural decision that the SSA must understand in order to design real systems:

- The product the SSA is architecting will likely be a **SaaS** — understanding the model means understanding what is being built
- Integrations with external tools use **OAuth 2.0** — the SSA needs to specify which scopes are required and how the authorization flow works
- AI agents executing tasks in parallel depend on **queues and message brokers** — the SSA defines which tasks are synchronous and which are asynchronous
- RAG (Retrieval-Augmented Generation) systems use **cache** intensively to avoid recalculating embeddings and re-running identical searches
- APIs the SSA specifies need **versioning** — systems evolve, and the transition must be planned from the start
- **Feature flags** allow the SSA to specify gradual rollouts of new agent capabilities
- **Authentication and authorization** define who can access which agents, which data, which operations
- **JWT and API Keys** are the concrete mechanisms an agent uses to identify itself when accessing external services
- **Webhooks** are the mechanism by which external systems notify agents about relevant events
- The choice between **monolith and microservices** determines the entire topology of a multi-agent system

These are not implementation details. They are **architectural decisions** — and that is precisely where the SSA operates.

---

## Mini-glossary

| Term | Definition |
|------|-----------|
| **SaaS** | Software accessed via browser, under a subscription model |
| **PaaS** | Managed platform for building and running applications |
| **IaaS** | Virtualized infrastructure (servers, networking, storage) on demand |
| **MVC** | Architectural pattern that separates data (Model), interface (View), and logic (Controller) |
| **Monolith** | Single application that bundles all functionality |
| **Microservice** | Architecture where each capability is an independent service |
| **Authentication** | Identity verification ("who are you?") |
| **Authorization** | Permission verification ("what are you allowed to do?") |
| **MFA / 2FA** | Authentication with multiple factors (password + code, etc.) |
| **RBAC** | Role-based access control |
| **OAuth 2.0** | Delegated authorization protocol ("Sign in with Google") |
| **Access Token** | Temporary credential that grants access to resources |
| **JWT** | Self-contained token with header, payload, and cryptographic signature |
| **API Key** | Static key for service-to-service authentication |
| **Webhook** | URL that receives automatic notifications when events occur |
| **Idempotency** | Processing the same operation multiple times produces the same result |
| **Queue** | Pipeline for asynchronous message processing |
| **Message Broker** | System that manages queues and message routing |
| **Cache** | Fast storage for frequently accessed data |
| **TTL** | Time to live — how long a cached item remains valid before expiring |
| **Cache Hit / Miss** | Data found / not found in the cache |
| **Redis** | In-memory database used as cache, broker, and session store |
| **Feature Flag** | Mechanism for toggling features on/off without deployment |
| **Breaking Change** | Modification that causes existing clients to stop working |
| **SemVer** | Semantic versioning: MAJOR.MINOR.PATCH |
| **Open Source** | Software with publicly accessible source code |
| **MIT / Apache / GPL** | Open source licenses with varying degrees of permissiveness |
| **Multi-tenancy** | Multiple customers sharing the same software instance |
| **Hashing** | Irreversible data transformation (used for passwords) |
| **Copyleft** | License requiring derivative works to maintain the same license |
