type StringOrName<T1 extends string | number, T2 extends string | number> = 
    T1 extends number ? 
    (T2 extends string ? number : string) : 
    string;

function combine<T1 extends string | number, T2 extends string | number> (a: T1, b: T2): StringOrName<T1, T2> {
    if (typeof a === 'number' && typeof b === 'number') {
        return (a + b) as StringOrName<T1, T2>;
    } else {
        return (a as string + b as string) as StringOrName<T1, T2>;
    }
}
