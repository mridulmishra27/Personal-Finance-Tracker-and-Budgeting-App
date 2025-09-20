import { createContext } from "react";

export const AppContext = createContext()

const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const slotFormat = (slotDate) => {
    const dateArray = slotDate.split(/[-_]/);
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

const AppContextProvider = (props) => {

  const currency = "₹";
    const ageCalulator = (dob) => {
        const today = new Date()
        const birthday = new Date(dob)

        let age = today.getFullYear() - birthday.getFullYear()
        return age
    }
    
    const val = {
        ageCalulator,
        slotFormat,
        currency,
    }

    return (
        <AppContext.Provider  value={val}>
        {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider