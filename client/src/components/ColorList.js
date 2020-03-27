import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
	color: "",
	code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [colorToAdd, setColorToAdd] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

	const addColor = e => {
		e.preventDefault();
		axiosWithAuth()
			.post("/api/colors", colorToAdd)
			.then(res => {
				updateColors(res.data);
				setColorToAdd(initialColor);
			})
			.catch(err => console.log(err));
	};

	const saveEdit = e => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		axiosWithAuth()
			.put(`/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				updateColors(
					colors.map(color => {
						return color.id === colorToEdit.id ? res.data : color;
					})
				);
				setEditing(false);
			})
			.catch(err => console.log(err));
	};

	const deleteColor = color => {
		// make a delete request to delete this color
		axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then(res =>
				updateColors(
					// console.log(res)
					colors.filter(mappedColor => mappedColor.id !== res.data)
				)
			)
			.catch(err => console.log(err));
	};

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{" "}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			{!editing && (
				<div className="add-color">
					<p>Add Color</p>
					<form onSubmit={addColor}>
						<input
							type="text"
							name="color"
							placeholder="Color Name"
							value={colorToAdd.color}
							onChange={e =>
								setColorToAdd({ ...colorToAdd, color: e.target.value })
							}
						/>
						<input
							type="text"
							name="code"
							placeholder="Hex Code"
							value={colorToAdd.code.hex}
							onChange={e =>
								setColorToAdd({
									...colorToAdd,
									code: { hex: e.target.value }
								})
							}
						/>
						<button type="submit">Add Color</button>
					</form>
				</div>
			)}
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
