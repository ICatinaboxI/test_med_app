import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    };

    const handleInputFocus = () => {
        setDoctorResultHidden(false);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setDoctorResultHidden(true);
        }, 100); // Add a small delay to handle click events on the list items
    };

    return (
        <div className='finddoctor'>
            <center>
                <h1><br></br></h1>
                <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="doctor-search-box">
                        <input
                            type="text"
                            className="search-doctor-input-box"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={searchDoctor}
                            onChange={(e) => setSearchDoctor(e.target.value)}
                        />
                        <div className="findiconimg">
                            <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" />
                        </div>
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {specialities
                                .filter((speciality) =>
                                    speciality.toLowerCase().includes(searchDoctor.toLowerCase())
                                )
                                .map((speciality) => (
                                    <div
                                        className="search-doctor-result-item"
                                        key={speciality}
                                        onMouseDown={() => handleDoctorSelect(speciality)}
                                    >
                                        <span>
                                            <img
                                                src={process.env.PUBLIC_URL + '/images/search.svg'}
                                                alt=""
                                                style={{ height: '10px', width: '10px' }}
                                                width="12"
                                            />
                                        </span>
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearch;