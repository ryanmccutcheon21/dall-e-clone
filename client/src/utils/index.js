import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]

    // check so we don't get the same prompt twice
    if (randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt
}