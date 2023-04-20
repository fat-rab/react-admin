export interface Dict {
    label: string
    value: string
}

export interface DictResult {
    [key: string]: Array<Dict>
}

export interface DictState {
    dict: DictResult
}

