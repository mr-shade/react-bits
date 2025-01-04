const Dependencies = ({ dependencyList = [] }) => {
  return (
    <>
      <h2 className="demo-title-extra">Dependencies</h2>
      <div className="demo-details">
        {dependencyList.map(d =>
          <span key={d}>{d}</span>
        )}
      </div>
    </>
  );
}

export default Dependencies;