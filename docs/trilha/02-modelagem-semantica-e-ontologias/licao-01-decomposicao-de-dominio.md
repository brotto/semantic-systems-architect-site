---
sidebar_position: 2
sidebar_label: "Lesson 1 — Domain decomposition"
---

# Lesson 1 — Domain decomposition

## What is a domain, and why does it matter?

Every system operates within a **domain** — a specific area of knowledge with its own vocabulary, rules, and logic.

A hospital operates in the clinical domain. A bank operates in the financial domain. A food delivery app operates in the logistics and commerce domain. A school operates in the educational domain.

When you build an AI system for a domain, the system needs to understand that domain's world: what things exist, how they relate to each other, what can happen, and what can't.

This understanding is called a **domain ontology** — and building it is the most important thing an SSA does.

---

## The supermarket analogy

The best way to understand domain decomposition is to think about how a supermarket is organized.

Walk into any supermarket. What do you see? It's not random. Everything is structured:

**Entities (the "things" that exist):**
- Products (name, brand, price, weight, category, barcode, expiration date)
- Categories (produce, dairy, bakery, frozen, beverages, household)
- Shelves (location, capacity, assigned category)
- Suppliers (name, contact, delivery schedule, products supplied)
- Customers (loyalty card number, purchase history)
- Employees (name, role, assigned section)
- Shopping carts (contents, current total)

**Relationships (how things connect):**
- Products *belong to* Categories
- Products *sit on* Shelves
- Products *come from* Suppliers
- Customers *purchase* Products
- Employees *manage* Sections (which contain Shelves)

**States (what conditions things can be in):**
- A product can be: in stock, low stock, out of stock, expired, recalled
- An order can be: placed, confirmed, shipped, delivered, returned
- A shelf can be: full, partially stocked, empty, under maintenance

**Transitions (how things change state):**
- A product goes from "in stock" to "low stock" when quantity drops below threshold
- A product goes from "in stock" to "expired" when the date passes
- An "expired" product goes to "removed" — it cannot go back to "in stock"

**Rules (what must always be true):**
- An expired product must never be displayed for sale
- A recalled product must be removed from all shelves immediately
- A product's price must always match the price in the system

This structure IS the supermarket's domain ontology. Without it, the supermarket is just a building full of stuff. With it, every product is in the right place, every price is correct, and every employee knows what to do.

**An AI system without a domain ontology is like a supermarket without organization — chaos where nothing can be found and nothing can be trusted.**

---

## The four building blocks of a domain ontology

Every domain, no matter how complex, can be decomposed into four building blocks:

### 1. Entities

**What they are:** the distinct "things" that exist in your domain.

**How to find them:** ask yourself — if I were explaining this domain to someone who knows nothing about it, what nouns would I use?

In a hospital: patient, doctor, nurse, diagnosis, medication, prescription, appointment, ward, bed, test, result.

In a school: student, teacher, course, class, assignment, grade, semester, classroom, curriculum.

In a ride-sharing app: rider, driver, trip, vehicle, route, payment, rating, pickup location, destination.

**A common mistake:** listing too many entities (everything becomes an entity) or too few (grouping unlike things together). A good test: if two "things" have different attributes or different behavior, they're probably different entities. "Doctor" and "nurse" are different entities — they have different roles, different capabilities, and different rules governing their actions. But "doctor's first name" is not an entity — it's an attribute of the Doctor entity.

**Everyday analogy:** think about organizing your closet. Your clothes are your entities. But you don't have one entity called "clothing" — you have shirts, pants, jackets, shoes, accessories. Each type has different attributes (shirts have sleeve length; shoes have size) and different storage requirements (shirts hang; shoes go on a rack). Getting the granularity right is the first skill.

### 2. Attributes

**What they are:** the properties that describe each entity.

**How to find them:** for each entity, ask — what do I need to know about this thing to work with it? What distinguishes one instance from another?

For a **Patient** entity in a hospital:

```
Patient
  - id: unique identifier
  - name: full name
  - date_of_birth: birth date
  - blood_type: A+, A-, B+, B-, AB+, AB-, O+, O-
  - allergies: list of known allergies
  - current_medications: list of medications being taken
  - insurance_status: insured, uninsured, pending verification
  - primary_physician: reference to Doctor entity
```

**Key question for each attribute:** is this attribute necessary for the system to make decisions? If the system never uses "date_of_birth" for any decision, it may not need to be in the ontology. But if it's used for age-based dosage calculations, it's essential.

**Everyday analogy:** think about a contact in your phone. What attributes does it have? Name, phone number, email, photo, birthday, notes, group. Each attribute serves a purpose. You probably don't need "shoe size" in your contacts — but a shoe store's customer database probably does.

### 3. Relationships

**What they are:** the connections between entities. How one thing relates to another.

**Types of relationships:**

**One-to-one:** each Patient has one Primary Physician. Each Primary Physician has one Chief Resident.

**One-to-many:** one Doctor has many Patients. One Course has many Students. One Supplier delivers many Products.

**Many-to-many:** many Students take many Courses. Many Doctors treat many Patients (in a hospital, a patient might see multiple specialists).

**Hierarchical:** a Hospital has Departments, which have Wards, which have Beds. A Company has Divisions, which have Teams, which have Members.

**How to find them:** take any two entities and ask — does one relate to the other? How? Can one exist without the other?

**Everyday analogy:** think about a family tree. The relationships ARE the tree: parent-of, child-of, sibling-of, married-to. Without the relationships, you just have a list of names. With the relationships, you have a complete family structure. The same is true for domain ontologies — the relationships are what give the entities meaning in relation to each other.

### 4. States and transitions

**What they are:** the conditions an entity can be in (states) and how it moves between them (transitions).

**Why this is critical:** states and transitions define the lifecycle of each entity. They tell the AI system what can happen to something and in what order.

**Example — an Order in an e-commerce system:**

```
States: draft → placed → confirmed → preparing → shipped → delivered → completed
                                                                    ↘ returned → refunded

Invalid transitions:
  - A "draft" order cannot become "shipped" (it must be confirmed first)
  - A "completed" order cannot become "draft" (no going back)
  - A "delivered" order can become "returned" (within 30 days) OR "completed"
```

**Why this matters for AI:** if you don't specify valid states and transitions, the AI system might:
- Tell a customer their order is "shipped" when it hasn't been confirmed yet
- Allow someone to return a product that was delivered 6 months ago
- Move an order from "preparing" back to "draft" — which makes no sense

**Everyday analogy:** think about the states of water. Water can be solid (ice), liquid (water), or gas (steam). These are its states. The transitions are: melting (solid → liquid), boiling (liquid → gas), freezing (liquid → solid), condensing (gas → liquid). Water cannot go directly from ice to steam without passing through liquid (at normal pressure). These rules are the physics of water. The states and transitions in your ontology are the "physics" of your domain — they define what's possible.

---

## How to decompose a domain: a step-by-step process

Here is a repeatable process for decomposing any domain into an ontology. You can do this for a hospital, a restaurant, a school, a financial system, or any other domain.

### Step 1: Start with the core entities (15 minutes)

List the 5-8 most important "things" in the domain. Don't try to be complete — start with the obvious ones.

**Technique:** imagine you're writing a one-paragraph description of the domain for someone who knows nothing about it. Which nouns do you use? Those are your core entities.

"A **restaurant** serves **meals** to **customers**. Each meal is prepared by a **chef** following a **recipe** using **ingredients** from **suppliers**. **Orders** are taken by **waiters** and tracked until delivery."

Core entities: Restaurant, Meal, Customer, Chef, Recipe, Ingredient, Supplier, Order, Waiter.

### Step 2: Add attributes to each entity (20 minutes)

For each entity, list 4-8 key attributes. Focus on attributes that:
- Distinguish one instance from another
- Are used in decisions the system makes
- Change over time (state-like)

Don't add attributes "just in case." Every attribute should have a purpose.

### Step 3: Map relationships (15 minutes)

Draw connections between entities. For each relationship, specify:
- **Direction:** which entity "owns" the relationship
- **Cardinality:** one-to-one, one-to-many, or many-to-many
- **Dependency:** can one exist without the other? (A Line Item cannot exist without an Order)

**Tip:** if you can say "A has many B" or "A belongs to B," you've found a relationship.

### Step 4: Define states and transitions (20 minutes)

For each entity that changes over time, define:
- What states can it be in?
- What events trigger transitions?
- What transitions are NOT allowed?
- What state does it start in?
- What states are "final" (no further transitions possible)?

Not every entity needs states. A "Customer" might not have formal states (they just exist). But an "Order" definitely does (draft → placed → completed...).

### Step 5: Add examples (10 minutes)

For each entity, provide 2-3 concrete examples. This does two things:
- Validates that your model makes sense (if you can't create a realistic example, something is wrong)
- Creates a shared understanding for anyone reading the ontology

```
Entity: Recipe
  Example 1: "Margherita Pizza" — type: main, prep_time: 15min, ingredients: [dough, tomato sauce, mozzarella, basil], dietary: vegetarian
  Example 2: "Caesar Salad" — type: starter, prep_time: 10min, ingredients: [romaine, croutons, parmesan, dressing], dietary: contains gluten, dairy
```

### Step 6: Validate with the "stupid question" test (10 minutes)

Ask deliberately naive questions about your ontology. If you can't answer them clearly, your ontology has gaps.

- "Can a customer place an order without being at the restaurant?" (tests whether your ontology handles delivery/takeout)
- "What happens if a chef is sick and nobody can prepare a recipe?" (tests whether your ontology links recipes to specific chefs or to any chef)
- "Can an ingredient belong to zero recipes?" (tests whether orphaned entities are possible)
- "What happens if a supplier stops delivering?" (tests how your ontology handles disruptions)

These "stupid questions" often reveal the most important design decisions.

---

## A worked example: veterinary clinic

Let's walk through a complete domain decomposition for a veterinary clinic.

### Core entities

```
Pet
  - id, name, species, breed, date_of_birth, weight, owner_id
  - States: active, deceased, transferred
  - Example: "Luna" — species: dog, breed: golden retriever, DOB: 2020-03-15, weight: 28kg

Owner
  - id, name, phone, email, address, pets (list)
  - Example: "Maria Silva" — phone: +55 11 99999, pets: [Luna, Milo]

Veterinarian
  - id, name, license_number, specializations, schedule
  - Example: "Dr. Carlos Mendes" — license: CRMV-12345, specializations: [surgery, dermatology]

Appointment
  - id, pet_id, vet_id, date_time, reason, status, notes
  - States: scheduled → checked_in → in_progress → completed → billed
  - Invalid: completed cannot go back to in_progress

Medical Record
  - id, pet_id, date, vet_id, diagnosis, treatment, medications_prescribed
  - Example: "2024-01-15, Luna, ear infection, prescribed antibiotics for 7 days"

Medication
  - id, name, type, dosage_by_weight, contraindications, stock_level
  - States: in_stock, low_stock, out_of_stock, discontinued
  - Example: "Amoxicillin 250mg" — dosage: 10mg/kg, contraindicated with: [kidney disease]

Invoice
  - id, appointment_id, owner_id, items, total, status
  - States: draft → issued → paid → overdue
  - Invalid: paid cannot become draft

Vaccination
  - id, pet_id, vaccine_name, date_administered, next_due_date, vet_id
  - Example: "Luna, Rabies vaccine, 2024-01-15, next due: 2025-01-15"
```

### Relationships

```
Owner has many Pets (one-to-many)
Pet has many Appointments (one-to-many)
Pet has many Medical Records (one-to-many)
Pet has many Vaccinations (one-to-many)
Veterinarian has many Appointments (one-to-many)
Appointment produces one Medical Record (one-to-one)
Appointment generates one Invoice (one-to-one)
Medical Record may reference many Medications (many-to-many)
```

### State diagram for Appointment

```
scheduled → checked_in → in_progress → completed → billed
    ↓                                       ↓
  cancelled                             follow_up_needed
                                            ↓
                                    new appointment created
```

### The "stupid question" test

- "Can a pet have two owners?" → Currently no (one owner). But what about shared custody? **Decision: add support for co-ownership later if needed. For now, one primary owner.**
- "What if a pet comes in without an owner?" → Emergency walk-in. **Decision: create a "pending owner" placeholder.**
- "Can a vet prescribe a medication that's out of stock?" → The ontology allows it (prescription is a record), but the system should warn. **Decision: add a "stock check" step to the prescription workflow.**
- "What happens to appointments when a vet is on vacation?" → **Decision: appointment must be reschedulable. Add "rescheduled" state.**

Notice how each "stupid question" revealed a real design decision that needed to be made.

---

## Common mistakes in domain decomposition

### Mistake 1: Too granular

Modeling every conceivable detail. If your ontology has 50 entities for a simple system, you've over-decomposed. A veterinary clinic doesn't need separate entities for "WaitingRoom," "ParkingLot," and "ReceptionDesk" unless those are relevant to the AI system's decisions.

**Rule of thumb:** if the AI system never makes a decision about an entity, that entity probably doesn't belong in the ontology.

### Mistake 2: Too abstract

The opposite problem. Entities so broad they're meaningless. An entity called "Thing" with attributes "type" and "value" tells you nothing. Be specific enough that someone can look at your ontology and understand the domain.

### Mistake 3: Missing relationships

Entities without relationships are isolated islands. If you have a "Pet" entity and a "Vaccination" entity but no relationship connecting them, how does the system know which vaccinations belong to which pet?

### Mistake 4: Forgetting invalid transitions

Defining states without specifying what transitions are NOT allowed. It's not enough to say an Order can be "placed" or "completed." You must also say that a "completed" order cannot become "draft." Invalid transitions are where the most dangerous bugs hide.

### Mistake 5: No examples

An ontology without examples is a theory without evidence. Examples make the ontology concrete and testable. If you can't provide a realistic example for an entity, you may not understand that entity well enough.

---

## Practice activity

Choose one of these domains (or pick your own) and build a domain decomposition:

**Option A: A public library**
- What entities exist? (Books, Members, Loans, Fines, Events, Staff...)
- What are their attributes?
- How do they relate?
- What states and transitions exist for a Loan? For a Book?

**Option B: A gym / fitness center**
- What entities exist? (Members, Trainers, Classes, Equipment, Subscriptions, Bookings...)
- What are their attributes?
- How do they relate?
- What states and transitions exist for a Subscription? For a Booking?

**Option C: A pizza delivery service**
- What entities exist? (Orders, Pizzas, Toppings, Drivers, Customers, Stores, Payments...)
- What are their attributes?
- How do they relate?
- What states and transitions exist for an Order? For a Delivery?

For your chosen domain, produce:
1. At least **8 entities** with attributes
2. At least **6 relationships** with cardinality
3. State diagrams for **2 entities** (include invalid transitions)
4. **2 examples** per entity
5. **3 "stupid questions"** and the design decisions they reveal

---

## Key takeaways

1. **A domain ontology is a map of meaning.** It defines what exists, how things relate, what states are valid, and what rules govern the domain. Without it, the AI system has no foundation to reason on.

2. **Every domain decomposes into four building blocks:** entities, attributes, relationships, and states/transitions. Master these four and you can model any domain.

3. **The "stupid question" test is your most powerful tool.** Naive questions reveal the design decisions that matter most. If your ontology can't answer a simple question, it has a gap.

4. **States and invalid transitions prevent the worst bugs.** Defining what CAN'T happen is as important as defining what can. An order that goes from "completed" back to "draft" is a semantic error — and no amount of code testing will catch it if the ontology didn't forbid it.

5. **Examples make ontologies real.** Abstract definitions are necessary but insufficient. Concrete examples validate that the model works and create shared understanding.

---

## What comes next

In **Lesson 2 — Constraint engineering**, you'll learn to classify and formalize the rules that govern your domain. Not all rules are equal: some must never be broken, some are flexible, and some can be overridden under specific conditions. Getting this classification right is what makes an AI system safe and reliable.
