

const LabelComponent = ({
    equity,
    fixedIncome,
    pieChartFontSize = 18
  }) => (
    <div>
      <span style={{ color: 'black' }}>{equity}</span>
      <br />
      <span style={{ color: 'black', fontSize: `${pieChartFontSize}px` }}>{`${fixedIncome}%`}</span>
    </div>
  );
  
  export default LabelComponent;
  