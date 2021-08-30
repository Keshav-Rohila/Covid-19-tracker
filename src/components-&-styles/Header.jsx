import React, {useState} from 'react';
import "./Header.css";
import virus from "../virusImage.png";
import {FormControl, Select, MenuItem} from "@material-ui/core";

function Header(props) {
    const {country, countries, onCountryChange} = props;


    return (
        <div className = "header">
            <div className = "header__left">
                <img className = "header__virusImage img1" src = {virus} alt = "virus"></img>
                <img className = "header__virusImage img2" src = {virus} alt = "virus"></img>
                <img className = "header__virusImage img3" src = {virus} alt = "virus"></img>
                <h1><span className = "header__titleCovid19">Covid-19</span> Tracker</h1> 
            </div>

            <div className = "header__right">
              <FormControl >
                <Select className = "header__dropdown" onChange = {onCountryChange} value = {country} variant = "outlined">
                    <MenuItem value = "worldwide">Worldwide</MenuItem>
                    {countries.map(country => (
                        <MenuItem value = {country.value}>{country.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
        </div>
    )
}

export default Header;
