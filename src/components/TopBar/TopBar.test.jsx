import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import TopBar from './TopBar';

const topItems = [
  { iconClassName: 'g3-icon g3-icon--upload', link: '/submission', name: 'Data Submission' },
  { link: 'https://uc-cdis.github.io/gen3-user-doc/user-guide/guide-overview', name: 'Documentation' },
  { iconClassName: 'g3-icon g3-icon--exploration', link: '/explorer', name: 'Explorer' },
];

const user = {
  username: 'test-user',
};

const onActiveTab = jest.fn();
const onLogoutClick = jest.fn();

describe('<TopBar />', () => {
  const component = mount(
    <StaticRouter location={{ pathname: '/' }} context={{}}>
      <TopBar
        topItems={topItems}
        user={user}
        onActiveTab={onActiveTab}
        onLogoutClick={onLogoutClick}
      />
    </StaticRouter>
  );

  it('renders', () => {
    expect(component.find('TopBar').length).toBe(1);
  });

  it('maps external and internal links properly', () => {
    expect(component.find('Link').length).toBe(3);
    expect(component.find('a').length).toBe(topItems.length + 1);
  });

  it('wont show the user if undefined', () => {
    const noUserComponent = mount(
      <StaticRouter location={{ pathname: '/' }} context={{}}>
        <TopBar
          topItems={topItems}
          user={{}}
          onActiveTab={onActiveTab}
          onLogoutClick={onLogoutClick}
        />
      </StaticRouter>
    );
    expect(noUserComponent.find('a').length).toBe(topItems.length);
  });
});
