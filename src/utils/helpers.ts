import { container } from 'tsyringe'

export const resolveInstance = async <T>(path: string): Promise<T> => {
	const clazz = (await import(path)).default
	return container.resolve<T>(clazz)
}

export const getNameFromFilename = (filename: string): string | null => {
	const regexed = /(.+)\.(js|ts)/i.exec(filename)

	if (!regexed || !regexed[1]) {
		return null
	}

	return regexed[1].toLocaleLowerCase()
}