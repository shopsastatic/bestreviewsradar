import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import { SiteWrapperChild } from "./SiteWrapperChild";

interface SiteWrapperProviderProps {
  children: React.ReactNode;
  __TEMPLATE_QUERY_DATA__: any;
}

const SiteWrapperProvider: FC<SiteWrapperProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <Provider store={store}>
      {children}
      <SiteWrapperChild {...props} />
    </Provider>
  );
};

export default SiteWrapperProvider;
