import React, {useState, createContext} from 'react';

export const QuotationItemsContext = createContext();

export const QuotationItemsProvider = props => {
  const [quotationItems, setQuotationItems] = useState([]);
  return (
    <QuotationItemsContext.Provider value={[quotationItems, setQuotationItems]}>
      {props.children}
    </QuotationItemsContext.Provider>
  );
};
