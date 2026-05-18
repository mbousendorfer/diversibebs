import { describe, expect, it } from "vitest"

import { foods, isFoodInPack, popotePacks, type Food } from "@/data/foods"

function makeFood(overrides: Partial<Food> = {}): Food {
  return {
    id: "test-food",
    name: "Test",
    emoji: "🥕",
    category: "Légumes",
    popotePackIds: [],
    minAgeMonths: 4,
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    preparation: "Test prep",
    level: "conseillé",
    sourceIds: [],
    tags: [],
    ...overrides,
  }
}

describe("popotePacks", () => {
  it("exposes at least the découverte pack", () => {
    const decouverte = popotePacks.find((pack) => pack.id === "decouverte")
    expect(decouverte).toBeDefined()
    expect(decouverte?.name).toBe("Pack découverte")
  })

  it("exposes the gros gros pack découverte", () => {
    const grosGros = popotePacks.find((pack) => pack.id === "gros-gros-decouverte")
    expect(grosGros).toBeDefined()
    expect(grosGros?.name).toBe("Gros gros pack découverte")
  })

  it("references food ids that exist in the catalog", () => {
    const knownIds = new Set(foods.map((food) => food.id))
    popotePacks.forEach((pack) => {
      pack.foodIds.forEach((id) => {
        expect(knownIds.has(id), `${pack.id} references unknown food id "${id}"`).toBe(true)
      })
    })
  })

  it("marks every pack food with its pack id on the catalog", () => {
    popotePacks.forEach((pack) => {
      pack.foodIds.forEach((id) => {
        const food = foods.find((item) => item.id === id)
        expect(food?.popotePackIds).toContain(pack.id)
      })
    })
  })
})

describe("isFoodInPack", () => {
  it("returns false when packId is null", () => {
    expect(isFoodInPack(makeFood({ popotePackIds: ["decouverte"] }), null)).toBe(false)
  })

  it("returns true when food belongs to the requested pack", () => {
    expect(isFoodInPack(makeFood({ popotePackIds: ["decouverte"] }), "decouverte")).toBe(true)
  })

  it("returns false when food does not belong to the requested pack", () => {
    expect(isFoodInPack(makeFood({ popotePackIds: [] }), "decouverte")).toBe(false)
  })

  it("returns false for an unknown pack id", () => {
    expect(isFoodInPack(makeFood({ popotePackIds: ["decouverte"] }), "inconnu")).toBe(false)
  })
})
