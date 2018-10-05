var  menu=[{
			"menu_id": "40281f816630182a0166301844410001",
			"parent_menu_id": "40281f816630182a0166301844370000",
			"menu_code": "000",
			"menu_name": "系统管理",
			"menu_url": "system/manager",
			"menu_icon": "el-icon-setting",
			"menu_type": "1",
			"order_no": "1",
			"create_time": "2018-10-01 22:46:28",
			"edit_time": null,
			"flag": "1",
			"description": "系统管理",
			"component": null,
			"submenus": [{
					"menu_id": "40281f816630182a0166301844410002",
					"parent_menu_id": "40281f816630182a0166301844410001",
					"menu_code": "000001",
					"menu_name": "用户管理",
					"menu_url": "system/user/manager",
					"menu_icon": "el-icon-refresh",
					"menu_type": "2",
					"order_no": "1",
					"create_time": "2018-10-01 22:46:28",
					"edit_time": null,
					"flag": "1",
					"description": "用户管理",
					"component": null,
					"submenus": [{
							"menu_id": "40281f816630182a0166301844410007",
							"parent_menu_id": "40281f816630182a0166301844410002",
							"menu_code": "000001001",
							"menu_name": "新增用户",
							"menu_url": "system/user/add",
							"menu_icon": null,
							"menu_type": "3",
							"order_no": "1",
							"create_time": "2018-10-01 22:46:28",
							"edit_time": null,
							"flag": "1",
							"description": "新增用户",
							"component": null,
							"submenus": null
						}
					]
				}, {
					"menu_id": "40281f816630182a0166301844410003",
					"parent_menu_id": "40281f816630182a0166301844410001",
					"menu_code": "000002",
					"menu_name": "用户管理",
					"menu_url": "system/role/manager",
					"menu_icon": "el-icon-menu",
					"menu_type": "2",
					"order_no": "2",
					"create_time": "2018-10-01 22:46:28",
					"edit_time": null,
					"flag": "1",
					"description": "角色管理",
					"component": null,
					"submenus": null
				}, {
					"menu_id": "40281f816630182a0166301844410004",
					"parent_menu_id": "40281f816630182a0166301844410001",
					"menu_code": "000003",
					"menu_name": "菜单管理",
					"menu_url": "system/menu/manager",
					"menu_icon": "el-icon-upload",
					"menu_type": "2",
					"order_no": "3",
					"create_time": "2018-10-01 22:46:28",
					"edit_time": null,
					"flag": "1",
					"description": "菜单管理",
					"component": null,
					"submenus": null
				}, {
					"menu_id": "40281f816630182a0166301844410005",
					"parent_menu_id": "40281f816630182a0166301844410001",
					"menu_code": "000004",
					"menu_name": "机构管理",
					"menu_url": "system/org/manager",
					"menu_icon": "el-icon-sort",
					"menu_type": "2",
					"order_no": "4",
					"create_time": "2018-10-01 22:46:28",
					"edit_time": null,
					"flag": "1",
					"description": "机构管理",
					"component": null,
					"submenus": null
				}
			]
		}, {
			"menu_id": "40281f816630182a0166301844410006",
			"parent_menu_id": "40281f816630182a0166301844370000",
			"menu_code": "001",
			"menu_name": "文件管理",
			"menu_url": "file/manager",
			"menu_icon": "el-icon-sort",
			"menu_type": "1",
			"order_no": "2",
			"create_time": "2018-10-01 22:46:28",
			"edit_time": null,
			"flag": "1",
			"description": "文件管理",
			"component": null,
			"submenus": null
		}
	]

var  path =function(menuparam){
	var arrPath=[];
	var navmunu=menuparam;
	for(var i=0;i<navmunu.length;i++){
		if(navmunu[i].urltype=='1' || navmunu[i].urltype==1){
			this.parseMenus(navmunu[i]['submenus']);
		}
		if(navmunu[i].urltype=='2' || navmunu[i].urltype==2){
			arrPath.push(navmunu[i].url);
		}
	}
}
export {menu};
