oreilly.views.LocationMap = Ext.extend(Ext.Panel, {
    coords: [37.788115, -122.402222],
    coordenadasSanMarcos: [-12.053423, -77.086022],
    mapText: '',
    permLink: '',
    initComponent: function(){
        
        var position = new google.maps.LatLng(this.coords[0], this.coords[1]);
        var positionSanMarcos = new google.maps.LatLng(this.coordenadasSanMarcos[0], this.coordenadasSanMarcos[1]);
        
        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Ubicacion',
            /*items: [{xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){
                    
                    Ext.Msg.confirm('Link Externo', 'Abrir en Google Maps?', function(res){
                        if (res == 'yes') window.location = this.permLink;
                    }, this);
                }
            }]*/
        }]
        
        var infowindow = new google.maps.InfoWindow({
            content: this.mapText
        });
        
        this.map = new Ext.Map({
            mapOptions : {
                center : position,  //nearby San Fran
                zoom: 12,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                    var marker = new google.maps.Marker({
                         position: position,
                         title : 'IBEROTEC',
                         map: map
                    });
					var markerSanMarcos = new google.maps.Marker({
                         position: positionSanMarcos,
                         title : 'San Marcos',
                         map: map
                    });
                    //infowindow.open(map, marker);

                    google.maps.event.addListener(marker, 'click', function() {
                         infowindow.open(map, marker);
                    });
                    google.maps.event.addListener(markerSanMarcos, 'click', function() {
                         infowindow.open(map, markerSanMarcoss);
                    });
                }
            }
        });
        
        this.items = this.map;
        
        oreilly.views.LocationMap.superclass.initComponent.call(this);
    }
});

Ext.reg('location', oreilly.views.LocationMap);
