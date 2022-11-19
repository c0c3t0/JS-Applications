import { getById, updateById } from '../api/data.js';
import { html } from '../lit.js';
import { validate } from './formValidator.js';

const editTemplate = (item, inputs) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${getFormData}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${inputs.makeInput}" id="new-make" type="text" name="make"
                    value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${inputs.modelInput}" id="new-model" type="text" name="model"
                    value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${inputs.yearInput}" id="new-year" type="number" name="year"
                    value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${inputs.descriptionInput}" id="new-description" type="text"
                    name="description" value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${inputs.priceInput}" id="new-price" type="number" name="price"
                    value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${inputs.imgInput}" id="new-image" type="text" name="img" value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

let ctx = null;

export async function showEdit(context) {
    ctx = context;

    const data = await getById(ctx.params.id);
    context.render(editTemplate(data, {}));
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const result = validate(data);

    const valid = Object.values(result).filter(el => el === 'is-invalid');
    if (valid.length > 0) {
        ctx.render(editTemplate(data, result));
        return;
    } else {
        await updateById(ctx.params.id, data);
        e.target.reset();
        ctx.page.redirect('/catalog'); ``
    }
}
