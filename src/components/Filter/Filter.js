import React from "react";
import Container from "../Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Filter.scss"

const Filter = props => {

    const {manualUpdate, sortDirectionChange, sortFieldChange} = props
    const {activeSortDirection, activeSortField, sortFields} = props
    const fields = []
    for (let field in sortFields) {
        const classes = 'filter__option '+(activeSortField === field ? 'filter__option_active' : '')
        fields.push(
            <div onClick={() => sortFieldChange(field)} className={classes} key={field}>{sortFields[field].title}</div>
        )
    }

    return(
        <Container.Item>
            <div className="filter">
                <div className="filter__options">
                    {fields}
                </div>
                <div className="filter__tools">
                    <div onClick={sortDirectionChange} className="filter__tool">
                        <FontAwesomeIcon icon={activeSortDirection === 'asc' ? "sort-alpha-down" : "sort-alpha-down-alt"}/>
                    </div>
                    <div onClick={manualUpdate} className="filter__tool">
                        <FontAwesomeIcon icon="sync-alt"/>
                    </div>
                </div>
            </div>
        </Container.Item>
    )
}

export default Filter