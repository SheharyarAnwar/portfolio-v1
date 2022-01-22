import React from "react";
import Header from "../Header";
interface Props {
  /**
   * Give classnames to the wrapper component of container children
   */
  className?: string | undefined;
}
/**
 * Container components ensures that the children fit into the 10 out of 12 grid columns
 * where 3 are reserved for header
 */
const Index: React.FC<Props> = ({ children, className }) => {
  return (
    <>
      <div className="grid grid-cols-12">
        {/* Space for sticky positioned header */}
        <Header />
        <div className={`col-span-10 col-start-3 bg-navy ${className}`}>
          {children}
        </div>
      </div>
    </>
  );
};
export default Index;
