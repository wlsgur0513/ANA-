function uploadImgPreview() {



    	

    let fileList = document.getElementById( "upImgFiles" ).files;



    

    function readAndPreview( fileList ) {



        

        if ( /\.(jpe?g|png|gif)$/i.test( fileList.name ) ) {



            let reader = new FileReader();



            reader.addEventListener( "load", function() {



                let image = new Image();



                image.width = "200";

                image.height = "200";

                image.title = fileList.name;

                image.src = this.result;



                

                document.getElementById( "thumbnailImgs" ).appendChild( image );



            }, false );



            
            if( fileList ) {

                reader.readAsDataURL( fileList );

            }

        }

    }



    if( fileList ) {



            

    [].forEach.call( fileList, readAndPreview );

    }

}