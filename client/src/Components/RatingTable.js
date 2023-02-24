import styled from "styled-components";
import { useState } from "react";

const RatingTable = () => {
  const [data, setData] = useState([]);
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    const newData = [...data, { place, name, rating, reviews }];
    setData(newData);
    setPlace("");
    setName("");
    setRating("");
    setReviews("");
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const itemToEdit = data[index];
    setPlace(itemToEdit.place);
    setName(itemToEdit.name);
    setRating(itemToEdit.rating);
    setReviews(itemToEdit.reviews);
  };

  const handleSave = (index) => {
    const newData = [...data];
    newData[index] = { place, name, rating, reviews };
    setData(newData);
    setPlace("");
    setName("");
    setRating("");
    setReviews("");
    setEditIndex(null);
  };

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableHeadCell>Place</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Overall rating</TableHeadCell>
            <TableHeadCell>Reviews</TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="number"
                    value={place}
                    onChange={(event) => setPlace(event.target.value)}
                  />
                ) : (
                  item.place
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="number"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                  />
                ) : (
                  item.rating
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="number"
                    value={reviews}
                    onChange={(event) => setReviews(event.target.value)}
                  />
                ) : (
                  item.reviews
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Button onClick={() => handleSave(index)}>Save</Button>
                ) : (
                  <Button onClick={() => handleEdit(index)}>Edit</Button>
                )}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Input
                type="number"
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                placeholder="Place"
              />
            </TableCell>
            <TableCell>
              <Input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                placeholder="Overall rating"
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={reviews}
                onChange={(event) => setReviews(event.target.value)}
                placeholder="Reviews"
              />
            </TableCell>
            <TableCell>
              <Button onClick={handleAdd}>Add</Button>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  margin: 20px;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #204c84;
  color: #fff;
`;

const TableHeadRow = styled.tr``;

const TableHeadCell = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
  text-align: center;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  text-align: center;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border-color: #204c84;
  }
`;

const Button = styled.button`
  padding: 5px;
  background-color: #204c84;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #204c84;
    border: 1px solid #204c84;
  }
`;

export default RatingTable;
