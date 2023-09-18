/* Selectively changes optional fiels to mandatory fields in a given type. A
selective version of Required<>. PR stands for partially required */
export type PR<T, K extends keyof T> = T & {[P in K]-?: T[P]};
