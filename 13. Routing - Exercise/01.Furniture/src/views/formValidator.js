export function validate(data) {
    let result = {
        makeInput: '',
        modelInput: '',
        yearInput: '',
        descriptionInput: '',
        priceInput: '',
        imgInput: ''
    }

    result.makeInput = data.make.length >= 4 ? 'is-valid' : 'is-invalid';
    result.modelInput = data.model.length >= 4 ? 'is-valid' : 'is-invalid';
    result.yearInput = (1950 <= data.year && data.year <= 2050) ? 'is-valid' : 'is-invalid';
    result.descriptionInput = data.description.length >= 10 ? 'is-valid' : 'is-invalid';
    result.priceInput = data.price > 0 ? 'is-valid' : 'is-invalid';
    result.imgInput = data.img !== '' ? 'is-valid' : 'is-invalid';

    return result;
}
