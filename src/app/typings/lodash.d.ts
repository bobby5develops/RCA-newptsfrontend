declare module _ {
    //_.partition
    interface LoDashStatic {
        /**
         * Creates an array of elements split into two groups, the first of which contains elements
         * predicate returns truthy for, while the second of which contains elements predicate returns falsey for.
         * @collection The collection to iterate over.
         * @predicate The function invoked per iteration.
         * @thisArg The this binding of predicate.
         **/
        partition<T>(collection: T[],
                     predicate: (item: T)=>boolean,
                     thisArg ?: any): T[][];
    }
}
