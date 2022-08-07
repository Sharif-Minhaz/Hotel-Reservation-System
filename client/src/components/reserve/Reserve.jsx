import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useContext } from "react";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../contexts/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpenModal, hotelId }) => {
	const navigate = useNavigate()
	const { data } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
	const { dates } = useContext(SearchContext);
	const [selectedRooms, setSelectedRooms] = useState([]);

	const handleSelect = (e) => {
		const { checked, value } = e.target;

		setSelectedRooms(
			checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
		);
	};

	const handleClick = async (e) => {
		try {
			await Promise.all(
				selectedRooms.map((roomId) => {
					const res = axios.put(
						`http://localhost:8800/api/rooms/availability/${roomId}`,
						{ dates: allDates }
					);
					return res.data;
				})
			);
			setOpenModal(false);
			navigate("/");
		} catch (error) {
			console.error(error)
		}
	};

	const getDateRange = (start, end) => {
		const date = new Date(start.getTime());

		let dates = [];

		while (date <= end) {
			dates.push(new Date(date.getTime()));
			date.setDate(date.getDate() + 1);
		}

		return dates;
	};

	const allDates = getDateRange(dates[0].startDate, dates[0].endDate);
	const isAvailable = (roomNumber) => {
		const isFound = roomNumber.unavailableDates.some((date) => {
			return allDates.includes(new Date(date.getTime()));
		});

		return !isFound;
	};

	return (
		<div className="reserve">
			<div className="rContainer">
				<FontAwesomeIcon
					icon={faCircleXmark}
					className="rClose"
					onClick={() => setOpenModal(false)}
				/>
				<span>Select your room: </span>
				{data.map((item) => {
					return (
						<div key={item._id} className="rItem">
							<div className="rItemInfo">
								<div className="rTitle">{item.title}</div>
								<div className="rDesc">{item.desc}</div>
								<div className="rMax">
									Max People: <b>{item.maxPeople}</b>
								</div>
								<div className="rPrice">{item.price}</div>
							</div>
							{item.roomNumbers?.map((roomNumber) => {
								return (
									<div className="room" key={roomNumber._id}>
										<label htmlFor="">{roomNumber.number}</label>
										<input
											type="checkbox"
											value={roomNumber._id}
											onChange={handleSelect}
											disabled={!isAvailable(roomNumber)}
										/>
									</div>
								);
							})}
						</div>
					);
				})}
				<button onClick={handleClick} className="rButton">
					Reserve now!
				</button>
			</div>
		</div>
	);
};

export default Reserve;
