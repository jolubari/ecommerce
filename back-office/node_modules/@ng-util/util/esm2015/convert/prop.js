/**
 * @fileoverview added by tsickle
 * Generated from: prop.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, D
 * @param {?} name
 * @param {?} fallback
 * @param {?} defaultValue
 * @return {?}
 */
function propDecoratorFactory(name, fallback, defaultValue) {
    /**
     * @param {?} target
     * @param {?} propName
     * @param {?=} originalDescriptor
     * @return {?}
     */
    function propDecorator(target, propName, originalDescriptor) {
        /** @type {?} */
        const privatePropName = `$$__${propName}`;
        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
        }
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true,
        });
        return {
            /**
             * @return {?}
             */
            get() {
                return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set(value) {
                if (originalDescriptor && originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(fallback(value, defaultValue));
                }
                this[privatePropName] = fallback(value, defaultValue);
            },
        };
    }
    return propDecorator;
}
/**
 * @param {?} value
 * @param {?=} allowUndefined
 * @return {?}
 */
export function toBoolean(value, allowUndefined = false) {
    return allowUndefined && typeof value === 'undefined' ? undefined : value != null && `${value}` !== 'false';
}
/**
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * ```ts
 * \@Input() InputBoolean() visible: boolean = false; / \@InputBoolean(null) visible: boolean = false;
 * ```
 * @param {?=} defaultValue
 * @return {?}
 */
export function InputBoolean(defaultValue = false) {
    return propDecoratorFactory('InputNumber', toBoolean, defaultValue);
}
/**
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
export function toNumber(value, fallbackValue = 0) {
    return !isNaN(parseFloat((/** @type {?} */ (value)))) && !isNaN(Number(value)) ? Number(value) : fallbackValue;
}
/**
 * Input decorator that handle a prop to do get/set automatically with toNumber
 *
 * ```ts
 * \@Input() \@InputNumber() visible: number = 1; / \@InputNumber(null) visible: number = 2;
 * ```
 * @param {?=} defaultValue
 * @return {?}
 */
export function InputNumber(defaultValue = 0) {
    return propDecoratorFactory('InputNumber', toNumber, defaultValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy91dGlsL2NvbnZlcnQvIiwic291cmNlcyI6WyJwcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFNBQVMsb0JBQW9CLENBQzNCLElBQVksRUFDWixRQUFzQyxFQUN0QyxZQUFpQjs7Ozs7OztJQUVqQixTQUFTLGFBQWEsQ0FBQyxNQUFXLEVBQUUsUUFBZ0IsRUFBRSxrQkFBaUQ7O2NBQy9GLGVBQWUsR0FBRyxPQUFPLFFBQVEsRUFBRTtRQUV6QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLEVBQUU7WUFDakUsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLGVBQWUsK0NBQStDLElBQUksYUFBYSxDQUFDLENBQUM7U0FDNUc7UUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUU7WUFDN0MsWUFBWSxFQUFFLElBQUk7WUFDbEIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCxPQUFPOzs7O1lBQ0wsR0FBRztnQkFDRCxPQUFPLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEgsQ0FBQzs7Ozs7WUFDRCxHQUFHLENBQUMsS0FBUTtnQkFDVixJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLEdBQUcsRUFBRTtvQkFDaEQsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7aUJBQ2xFO2dCQUNELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3hELENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBVSxFQUFFLGlCQUFpQyxLQUFLO0lBQzFFLE9BQU8sY0FBYyxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLEtBQUssT0FBTyxDQUFDO0FBQzlHLENBQUM7Ozs7Ozs7Ozs7QUFVRCxNQUFNLFVBQVUsWUFBWSxDQUFDLGVBQStCLEtBQUs7SUFDL0QsT0FBTyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3RFLENBQUM7Ozs7OztBQUlELE1BQU0sVUFBVSxRQUFRLENBQUMsS0FBVSxFQUFFLGdCQUF3QixDQUFDO0lBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDbkcsQ0FBQzs7Ozs7Ozs7OztBQVVELE1BQU0sVUFBVSxXQUFXLENBQUMsZUFBOEIsQ0FBQztJQUN6RCxPQUFPLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDckUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHByb3BEZWNvcmF0b3JGYWN0b3J5PFQsIEQ+KFxuICBuYW1lOiBzdHJpbmcsXG4gIGZhbGxiYWNrOiAodjogVCwgZGVmYXVsdFZhbHVlOiBEKSA9PiBELFxuICBkZWZhdWx0VmFsdWU6IGFueSxcbik6ICh0YXJnZXQ6IGFueSwgcHJvcE5hbWU6IHN0cmluZykgPT4gdm9pZCB7XG4gIGZ1bmN0aW9uIHByb3BEZWNvcmF0b3IodGFyZ2V0OiBhbnksIHByb3BOYW1lOiBzdHJpbmcsIG9yaWdpbmFsRGVzY3JpcHRvcj86IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPGFueT4pOiBhbnkge1xuICAgIGNvbnN0IHByaXZhdGVQcm9wTmFtZSA9IGAkJF9fJHtwcm9wTmFtZX1gO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIHByaXZhdGVQcm9wTmFtZSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVGhlIHByb3AgXCIke3ByaXZhdGVQcm9wTmFtZX1cIiBpcyBhbHJlYWR5IGV4aXN0LCBpdCB3aWxsIGJlIG92ZXJyaWRlZCBieSAke25hbWV9IGRlY29yYXRvci5gKTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcml2YXRlUHJvcE5hbWUsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxEZXNjcmlwdG9yICYmIG9yaWdpbmFsRGVzY3JpcHRvci5nZXQgPyBvcmlnaW5hbERlc2NyaXB0b3IuZ2V0LmJpbmQodGhpcykoKSA6IHRoaXNbcHJpdmF0ZVByb3BOYW1lXTtcbiAgICAgIH0sXG4gICAgICBzZXQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICAgICAgaWYgKG9yaWdpbmFsRGVzY3JpcHRvciAmJiBvcmlnaW5hbERlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICAgICAgb3JpZ2luYWxEZXNjcmlwdG9yLnNldC5iaW5kKHRoaXMpKGZhbGxiYWNrKHZhbHVlLCBkZWZhdWx0VmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzW3ByaXZhdGVQcm9wTmFtZV0gPSBmYWxsYmFjayh2YWx1ZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBwcm9wRGVjb3JhdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9Cb29sZWFuKHZhbHVlOiBhbnksIGFsbG93VW5kZWZpbmVkOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiBhbGxvd1VuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogdmFsdWUgIT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSAnZmFsc2UnO1xufVxuXG4vKipcbiAqIElucHV0IGRlY29yYXRvciB0aGF0IGhhbmRsZSBhIHByb3AgdG8gZG8gZ2V0L3NldCBhdXRvbWF0aWNhbGx5IHdpdGggdG9Cb29sZWFuXG4gKlxuICogYGBgdHNcbiAqIEBJbnB1dCgpIElucHV0Qm9vbGVhbigpIHZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAqIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4obnVsbCkgdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dEJvb2xlYW4oZGVmYXVsdFZhbHVlOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlKTogYW55IHtcbiAgcmV0dXJuIHByb3BEZWNvcmF0b3JGYWN0b3J5KCdJbnB1dE51bWJlcicsIHRvQm9vbGVhbiwgZGVmYXVsdFZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlOiBhbnkpOiBudW1iZXI7XG5leHBvcnQgZnVuY3Rpb24gdG9OdW1iZXI8RD4odmFsdWU6IGFueSwgZmFsbGJhY2s6IEQpOiBudW1iZXIgfCBEO1xuZXhwb3J0IGZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlOiBhbnksIGZhbGxiYWNrVmFsdWU6IG51bWJlciA9IDApOiBudW1iZXIge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUgYXMgYW55KSkgJiYgIWlzTmFOKE51bWJlcih2YWx1ZSkpID8gTnVtYmVyKHZhbHVlKSA6IGZhbGxiYWNrVmFsdWU7XG59XG5cbi8qKlxuICogSW5wdXQgZGVjb3JhdG9yIHRoYXQgaGFuZGxlIGEgcHJvcCB0byBkbyBnZXQvc2V0IGF1dG9tYXRpY2FsbHkgd2l0aCB0b051bWJlclxuICpcbiAqIGBgYHRzXG4gKiBASW5wdXQoKSBASW5wdXROdW1iZXIoKSB2aXNpYmxlOiBudW1iZXIgPSAxO1xuICogQElucHV0KCkgQElucHV0TnVtYmVyKG51bGwpIHZpc2libGU6IG51bWJlciA9IDI7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElucHV0TnVtYmVyKGRlZmF1bHRWYWx1ZTogbnVtYmVyIHwgbnVsbCA9IDApOiBhbnkge1xuICByZXR1cm4gcHJvcERlY29yYXRvckZhY3RvcnkoJ0lucHV0TnVtYmVyJywgdG9OdW1iZXIsIGRlZmF1bHRWYWx1ZSk7XG59XG4iXX0=