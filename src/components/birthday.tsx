import * as React from 'react';
import * as moment from 'moment';
import {Moment, Duration} from 'moment';
import leftpad from '../leftpad';

interface Props {};

interface State {
  now: Moment;
}

export default class Birthday extends React.Component<Props, State> {
  birthday: Moment;
  timer: number;

  constructor() {
    super();
    this.birthday = nextBirthday(moment());
    this.state = {now: moment()};
  }

  componentDidMount() {
    this.timer = setInterval(this.update.bind(this), 1000 / 30);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  update() {
    this.setState({
      now: moment(),
    });
  }

  render() {
    const delta = moment.duration(this.birthday.diff(this.state.now));
    return <Show birthday={this.birthday} delta={delta} />;
  }
}

function Show({birthday, delta}: {birthday: Moment, delta: Duration}) {
  const hours = leftpad(String(delta.hours()), 2, '0');
  const min = leftpad(String(delta.minutes()), 2, '0');
  const sec = leftpad(String(delta.seconds()), 2, '0');
  const ms = leftpad(String(delta.milliseconds()), 3, '0');
  return (
    <div>
      <h1><span title={birthday.format('YYYY/MM/DD')}>誕生日</span>まで</h1>
      <p>
        {delta.days()}日
        {hours}:{min}:{sec}.{ms}
      </p>
    </div>
  );
}

function nextBirthday(t: Moment) {
  let y = t.year();
  if (t.month() > 3) y += 1;
  else if (t.month() === 3 && t.date() < 7) y += 1;
  return moment([y, 2, 7]);
}
