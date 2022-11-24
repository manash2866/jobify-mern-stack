import Wrapper from "../assets/wrappers/StatItem"

const StatsItem = ({title, icon, count, bcg, color}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  )
}
export default StatsItem