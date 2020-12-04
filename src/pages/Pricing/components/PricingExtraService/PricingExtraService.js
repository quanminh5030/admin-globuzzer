import React from "react";
import "./style.css";

export const PricingExtraService = (props) => {
    const {pricingExtraService, setExtraPlan, index, setExtraModal, isRequested} = props;
    const {title, description, img} = pricingExtraService;
    return (
        <div className="extra_service_container">
            <img src={img} alt="extra service" className="extra_service_img" />
            <p className="extra_service_title">{title}</p>
            <p className="extra_service_description">{description}</p>
            {!isRequested && (
                <button
                    type="button"
                    className="extra_service_request"
                    onClick={() => {
                        setExtraPlan(index);
                        setExtraModal(true);
                    }}
                >
                    Request
                </button>
            )}
        </div>
    );
};
