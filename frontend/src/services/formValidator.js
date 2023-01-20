class formValidator {

    constructor(schema) {
        this.schema = schema
    }

    getElement(key) {
        return this.schema[key]
    }

    generateInitialForm() {
        var form = {}
        for (var key in this.schema) {
            form[key] = {
                label: this.schema[key].label,
                value: this.schema[key].initialValue,
                errorMessage: this.schema[key].errorMessage
            }
        }
        return form
    }

    generateValuesDict(form) {
        var valuesDict = {}
        for (var key in form) {
            valuesDict[key] = form[key].value
        }
        return valuesDict
    }

    validate(form) {
        var resForm = {...form}

        var formIsValid = true
        for (var key in resForm) {

            if (this.schema.hasOwnProperty(key) == false) {
                resForm[key].isValid = false
                formIsValid = false
            }

            else if (this.schema[key].hasOwnProperty('validation')) {
                resForm[key].isValid = this.schema[key].validation(resForm[key].value)
                if (resForm[key].isValid == false) {
                    formIsValid = false
                }
            }
            
            else {
                resForm[key].isValid = true
            }

        }

        return [formIsValid, resForm]
    }

}

export default formValidator