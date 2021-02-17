//==========//
// Property //
//==========//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(global.Object.prototype, "_", {
			get() {
				return new Proxy(this, {
					set(object, propertyName, descriptor) {
						Reflect.defineProperty(object, propertyName, descriptor)
					},
					get(object, propertyName) {
						const editor = {
							get value() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {value} = descriptor
								return value
							},
							set value(value) {
								const {enumerable, configurable, writable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true, writable: true}
								const descriptor = {value, enumerable, configurable, writable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get get() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {get} = descriptor
								return get
							},
							set get(get) {
								const {set, enumerable, configurable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const descriptor = {get, set, enumerable, configurable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get set() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {set} = descriptor
								return set
							},
							set set(set) {
								const {get, enumerable, configurable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const descriptor = {get, set, enumerable, configurable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get enumerable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {enumerable} = descriptor
								return enumerable
							},
							set enumerable(v) {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {configurable: true, writable: true}
								descriptor.enumerable = v
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get configurable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {configurable} = descriptor
								return configurable
							},
							set configurable(v) {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, writable: true}
								descriptor.configurable = v
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get writable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {writable} = descriptor
								return writable
							},
							set writable(v) {
								const oldDescriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const {get, set, writable, ...rest} = oldDescriptor
								const newDescriptor = {...rest, writable: v}
								Reflect.defineProperty(object, propertyName, newDescriptor)
							},
						}
						return editor
					},
				})
			},
			set(value) {
				Reflect.defineProperty(this, "_", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		
		Habitat.Property.installed = true
		
	}
	
	Habitat.Property = {install}
	
}