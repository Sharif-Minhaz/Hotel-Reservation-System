import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBed,
	faCalendarDays,
	faCar,
	faPerson,
	faPlane,
	faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "./header.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";

const Header = ({ type }) => {
	const navigate = useNavigate();
	const {user} = useContext(AuthContext);

	const [destination, setDestination] = useState("");
	const [openDate, setOpenDate] = useState(false);
	const [dates, setDates] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 2,
		children: 0,
		room: 1,
	});

	const { dispatch } = useContext(SearchContext);

	const handleOption = (option, type) => {
		setOptions((prev) => {
			return { ...prev, [option]: type === "i" ? options[option] + 1 : options[option] - 1 };
		});
	};

	const handleSearch = () => {
		dispatch({ type: "NEW_SEARCH", payload: { destination, options, dates } });
		navigate("/hotels", {
			state: {
				destination,
				dates,
				options,
			},
		});
	};

	return (
		<div className="header">
			<div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
				<div className="headerList">
					<div className="headerListItem active">
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faCar} />
						<span>Car rentals</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faPerson} />
						<span>Attractions</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport taxis</span>
					</div>
				</div>
				{type !== "list" && (
					<>
						<h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
						<p className="headerDesc">
							Get rewarded for your travels – unlock instant savings of 10% or more
							with a free hotelbooking account
						</p>
						{!user && <button className="headerBtn">Sign in / Register</button>}
						<div className="headerSearch">
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faBed} className="headerIcon" />
								<input
									className="headerSearchInput"
									type="text"
									placeholder="Where are you going?"
									onChange={(e) => setDestination(e.target.value)}
								/>
							</div>
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
								<span
									onClick={() => setOpenDate(!openDate)}
									className="headerSearchText"
								>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
									dates[0].endDate,
									"MM/dd/yyyy"
								)}`}</span>
								{openDate && (
									<DateRange
										editableDateInputs={true}
										onChange={(item) => setDates([item.selection])}
										moveRangeOnFirstSelection={false}
										minDate={new Date()}
										ranges={dates}
										className="date"
									/>
								)}
							</div>
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faBed} className="headerIcon" />
								<span
									className="headerSearchText"
									onClick={() => setOpenOptions(!openOptions)}
								>
									{options.adult} Adults . {options.children} children .{" "}
									{options.room} room
								</span>
								{openOptions && (
									<div className="options">
										<div className="optionItem">
											<span className="optionText">Adult</span>
											<div className="optionCounter">
												<button
													disabled={options.adult <= 1}
													className="optionCounterButton"
													onClick={() => handleOption("adult", "d")}
												>
													-
												</button>
												<span className="optionCounterNumber">
													{options.adult}
												</span>
												<button
													disabled={options.adult >= 9}
													className="optionCounterButton"
													onClick={() => handleOption("adult", "i")}
												>
													+
												</button>
											</div>
										</div>
										<div className="optionItem">
											<span className="optionText">Children</span>
											<div className="optionCounter">
												<button
													disabled={options.children <= 0}
													className="optionCounterButton"
													onClick={() => handleOption("children", "d")}
												>
													-
												</button>
												<span className="optionCounterNumber">
													{options.children}
												</span>
												<button
													disabled={options.children >= 9}
													className="optionCounterButton"
													onClick={() => handleOption("children", "i")}
												>
													+
												</button>
											</div>
										</div>
										<div className="optionItem">
											<span className="optionText">Room</span>
											<div className="optionCounter">
												<button
													disabled={options.room <= 1}
													className="optionCounterButton"
													onClick={() => handleOption("room", "d")}
												>
													-
												</button>
												<span className="optionCounterNumber">
													{options.room}
												</span>
												<button
													disabled={options.room >= 9}
													className="optionCounterButton"
													onClick={() => handleOption("room", "i")}
												>
													+
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="headerSearchItem">
								<button className="headerBtn" onClick={handleSearch}>
									Search
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
