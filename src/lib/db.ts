import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

export interface Preset {
    id: string
    name: string
    shader: string
    values: Record<string, unknown>
    thumbnail: string
    createdAt: number
}

export interface LibraryImage {
    id: string
    data: string
    type: 'svg' | 'png' | 'jpeg' | 'gif' | 'webp'
    name: string
    createdAt: number
}

interface PaperRunDB extends DBSchema {
    presets: {
        key: string
        value: Preset
        indexes: { 'by-created': number }
    }
    images: {
        key: string
        value: LibraryImage
        indexes: { 'by-created': number }
    }
}

const DB_NAME = 'paper-run-db'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<PaperRunDB>> | null = null

export async function initDB(): Promise<IDBPDatabase<PaperRunDB>> {
    if (!dbPromise) {
        dbPromise = openDB<PaperRunDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                // Create presets store
                if (!db.objectStoreNames.contains('presets')) {
                    const presetsStore = db.createObjectStore('presets', { keyPath: 'id' })
                    presetsStore.createIndex('by-created', 'createdAt')
                }
                // Create images store
                if (!db.objectStoreNames.contains('images')) {
                    const imagesStore = db.createObjectStore('images', { keyPath: 'id' })
                    imagesStore.createIndex('by-created', 'createdAt')
                }
            },
        })
    }
    return dbPromise
}

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

// Preset functions
export async function savePreset(
    name: string,
    shader: string,
    values: Record<string, unknown>,
    thumbnail: string
): Promise<Preset> {
    const db = await initDB()
    const preset: Preset = {
        id: generateId(),
        name,
        shader,
        values,
        thumbnail,
        createdAt: Date.now(),
    }
    await db.put('presets', preset)
    return preset
}

export async function getPresets(): Promise<Preset[]> {
    const db = await initDB()
    const presets = await db.getAllFromIndex('presets', 'by-created')
    return presets.reverse() // Most recent first
}

export async function deletePreset(id: string): Promise<void> {
    const db = await initDB()
    await db.delete('presets', id)
}

// Image functions
export async function saveImage(data: string, name: string): Promise<LibraryImage> {
    const db = await initDB()

    // Determine image type from data URL
    let type: LibraryImage['type'] = 'png'
    if (data.includes('image/svg')) type = 'svg'
    else if (data.includes('image/jpeg') || data.includes('image/jpg')) type = 'jpeg'
    else if (data.includes('image/gif')) type = 'gif'
    else if (data.includes('image/webp')) type = 'webp'

    const image: LibraryImage = {
        id: generateId(),
        data,
        type,
        name,
        createdAt: Date.now(),
    }
    await db.put('images', image)
    return image
}

export async function getImages(): Promise<LibraryImage[]> {
    const db = await initDB()
    const images = await db.getAllFromIndex('images', 'by-created')
    return images.reverse() // Most recent first
}

export async function deleteImage(id: string): Promise<void> {
    const db = await initDB()
    await db.delete('images', id)
}
