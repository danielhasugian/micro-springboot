import React from 'react'

import {SideMenu, SideMenuItem, GeneratedSideMenu} from '../control/LeftMenu'

export default ({children})=> (
		<div id='wrapper'>
        <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
            <div className='navbar-header'>
                <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'>
                    <span className='sr-only'>Toggle navigation</span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                </button>
                <a className='navbar-brand' href='index.html'>SB Admin</a>
            </div>
            <ul className='nav navbar-right top-nav'>
                <li className='dropdown'>
                    <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-envelope'></i> <b className='caret'></b></a>
                    <ul className='dropdown-menu message-dropdown'>
                        <li className='message-preview'>
                            <a href='#'>
                                <div className='media'>
                                    <span className='pull-left'>
                                        <img className='media-object' src='http://placehold.it/50x50' alt=''/>
                                    </span>
                                    <div className='media-body'>
                                        <h5 className='media-heading'><strong>John Smith</strong>
                                        </h5>
                                        <p className='small text-muted'><i className='fa fa-clock-o'></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className='message-preview'>
                            <a href='#'>
                                <div className='media'>
                                    <span className='pull-left'>
                                        <img className='media-object' src='http://placehold.it/50x50' alt=''/>
                                    </span>
                                    <div className='media-body'>
                                        <h5 className='media-heading'><strong>John Smith</strong>
                                        </h5>
                                        <p className='small text-muted'><i className='fa fa-clock-o'></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className='message-preview'>
                            <a href='#'>
                                <div className='media'>
                                    <span className='pull-left'>
                                        <img className='media-object' src='http://placehold.it/50x50' alt=''/>
                                    </span>
                                    <div className='media-body'>
                                        <h5 className='media-heading'><strong>John Smith</strong>
                                        </h5>
                                        <p className='small text-muted'><i className='fa fa-clock-o'></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className='message-footer'>
                            <a href='#'>Read All New Messages</a>
                        </li>
                    </ul>
                </li>
                <li className='dropdown'>
                    <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-bell'></i> <b className='caret'></b></a>
                    <ul className='dropdown-menu alert-dropdown'>
                        <li>
                            <a href='#'>Alert Name <span className='label label-default'>Alert Badge</span></a>
                        </li>
                        <li>
                            <a href='#'>Alert Name <span className='label label-primary'>Alert Badge</span></a>
                        </li>
                        <li>
                            <a href='#'>Alert Name <span className='label label-success'>Alert Badge</span></a>
                        </li>
                        <li>
                            <a href='#'>Alert Name <span className='label label-info'>Alert Badge</span></a>
                        </li>
                        <li>
                            <a href='#'>Alert Name <span className='label label-warning'>Alert Badge</span></a>
                        </li>
                        <li>
                            <a href='#'>Alert Name <span className='label label-danger'>Alert Badge</span></a>
                        </li>
                        <li className='divider'></li>
                        <li>
                            <a href='#'>View All</a>
                        </li>
                    </ul>
                </li>
                <li className='dropdown'>
                    <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-user'></i> John Smith <b className='caret'></b></a>
                    <ul className='dropdown-menu'>
                        <li>
                            <a href='#'><i className='fa fa-fw fa-user'></i> Profile</a>
                        </li>
                        <li>
                            <a href='#'><i className='fa fa-fw fa-envelope'></i> Inbox</a>
                        </li>
                        <li>
                            <a href='#'><i className='fa fa-fw fa-gear'></i> Settings</a>
                        </li>
                        <li className='divider'></li>
                        <li>
                            <a href='#'><i className='fa fa-fw fa-power-off'></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className='collapse navbar-collapse navbar-ex1-collapse'>
                <GeneratedSideMenu items={
            			[{iconClass: 'fa-table', desc: 'Test Item', to: '/hello'},
            			 {iconClass: 'fa-wrench', desc: 'Test Submenu', 
            				children: [
            				   {iconClass: 'fa-dashboard', desc: 'Main', to: '/main'}, 
            				   {iconClass: 'fa-wrench', desc: 'Test Submenu 2', 
            					   children: [{iconClass: 'fa-table', desc: 'Calculator Item', to: '/calc'},
            					              {iconClass: 'fa-bar-chart-o', desc: 'Main', to: '/main'}]
            				   }]}]
                
            		} >
                    <li>
                        <a href='index.html'><i className='fa fa-fw fa-dashboard'></i> Dashboard</a>
                    </li>
                    <li className='active'>
                        <a href='charts.html'><i className='fa fa-fw fa-bar-chart-o'></i> Charts</a>
                    </li>
                    <li>
                        <a href='tables.html'><i className='fa fa-fw fa-table'></i> Tables</a>
                    </li>
                    <li>
                        <a href='forms.html'><i className='fa fa-fw fa-edit'></i> Forms</a>
                    </li>
                    <li>
                        <a href='bootstrap-elements.html'><i className='fa fa-fw fa-desktop'></i> Bootstrap Elements</a>
                    </li>
                    <li>
                        <a href='bootstrap-grid.html'><i className='fa fa-fw fa-wrench'></i> Bootstrap Grid</a>
                    </li>
                    <SideMenuItem iconClass='fa-wrench' to='/main' desc='Bootstrap Grid'/>
                    <li>
                        <a href='javascript:;' data-toggle='collapse' data-target='#demo'><i className='fa fa-fw fa-arrows-v'></i> Dropdown <i className='fa fa-fw fa-caret-down'></i></a>
                        <ul id='demo' className='collapse'>
                            <li>
                                <a href='#'>Dropdown Item</a>
                            </li>
                            <li>
                                <a href='#'>Dropdown Item</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href='blank-page.html'><i className='fa fa-fw fa-file'></i> Blank Page</a>
                    </li>
                    <li>
                        <a href='index-rtl.html'><i className='fa fa-fw fa-dashboard'></i> RTL Dashboard</a>
                    </li>
                </GeneratedSideMenu>
            </div>
        </nav>
        <div id='page-wrapper'>
        	{children}
		</div>
	</div>)