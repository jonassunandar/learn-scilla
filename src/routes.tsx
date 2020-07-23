// @ts-ignore
import React, { Suspense, lazy, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import ReactGA from 'react-ga';

import { Spinner } from 'react-fn-components';
import HomeContainer from './containers/home-container';
const ChapterListContainer = lazy(() => import('./containers/chapter-list-container'));
// const SolidityChapterListContainer = lazy(() => import('./containers/solidity-chapter-list-container'));
const LessonContainer = lazy(() => import('./containers/lesson-container'));
// const SolidityLessonContainer = lazy(() => import('./containers/solidity-lesson-container'));

export const paths = {
  home: '/home',
  chapterList: '/:course/chapters',
  lesson: '/:course/chapter/:chapter/lesson/:lesson',
  // default:'/solidity/chapters'
  // solidityChapterList: '/solidity/chapters',
  // solidityLesson: '/solidity/chapter/:chapter/lesson/:lesson'
};

const sendPageView = (location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
};

const GAListener = (props) => {
  const { children, history } = props;
  const GA_KEY = 'UA-166098752-1';
  ReactGA.initialize(GA_KEY);
  useEffect(() => {
    sendPageView(history.location);
    return history.listen(sendPageView);
  }, [history]);

  return children;
};

const GoogleAnalytics = withRouter(GAListener);

export const RouterNode: React.SFC = () => (
  <BrowserRouter>
    <GoogleAnalytics>
      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner />
          </div>
        }
      >
        <Switch>
          {/* <Route exact={true} path={paths.home} component={HomeContainer} /> */}
          <Route exact={true} path={paths.chapterList} component={ChapterListContainer} />
          <Route exact={true} path={paths.lesson} component={LessonContainer} />
          {/* <Route exact={true} path={paths.solidityLesson} component={SolidityLessonContainer} />
          <Route exact={true} path={paths.solidityChapterList} component={SolidityChapterListContainer} /> */}
          
          {/* <Redirect from="/" to={paths.default} /> */}
        </Switch>
      </Suspense>
    </GoogleAnalytics>
  </BrowserRouter>
);
