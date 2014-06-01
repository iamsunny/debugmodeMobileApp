var totalPosts=0;
var offsetCount=0;
var test;
function listPosts(data) {

	totalPosts = data.found;
	var output='<ul data-role="listview" data-filter="true">';
	$.each(data.posts,function(key,val) {
		test=val;
		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = val.excerpt;
		$("a",tempDiv).remove();
		var excerpt = tempDiv.innerHTML;	
	
		output += '<li>';
		output += '<a href="#blogpost" onclick="showPost(' + val.ID + ')">';
		output += '<h3>' + val.title + '</h3>';
		
		output += (val.thumbnail) ?
			'<img src="' + val.thumbnail + '" alt="' + val.title + '" />':
			'<img src="images/appicon.png" alt="Debugmode Logo" />';		
		output += '<p>' + excerpt + '</p>';
		output += '</a>';
		output += '</li>';
	}); // go through each post
	if(offsetCount<totalPosts){
		output+='<li class="centered" onclick="loadMorePosts(this);"><a><h3>show more posts...</h3></a></li>';
	}
	else{
		output+='<li class=centered"><a><h3>That'+"'s all folks!</h3></a></li>";
		}
	
	output+='</ul>';
	$('#postlist').html(output);
} // lists all the posts

var test;
function loadMorePosts(liElement){	
	offsetCount+=20;
	$(liElement).find('h3')
		.text("Loading...")
		.after('<img src="_/css/images/ajax-loader.gif" alt="Loading..." />');
	var postsUrl = "https://public-api.wordpress.com/rest/v1/sites/debugmode.net/posts/?pretty=1"+"&offset="+(offsetCount-1);	
	$.ajax(
	{
		url:postsUrl,
		success:function(data){
			$(liElement).remove();
			var output='';
			$.each(data.posts,function(key,val) {
		
				var tempDiv = document.createElement("tempDiv");
				tempDiv.innerHTML = val.excerpt;
				$("a",tempDiv).remove();
				var excerpt = tempDiv.innerHTML;	
			
				output += '<li>';
				output += '<a href="#blogpost" onclick="showPost(' + val.id + ')">';
				output += '<h3>' + val.title + '</h3>';
				
				output += (val.thumbnail) ?
					'<img src="' + val.thumbnail + '" alt="' + val.title + '" />':
					'<img src="images/appicon.png" alt="Debugmode Logo" />';
				output += '<p>' + excerpt + '</p>';
				output += '</a>';
				output += '</li>';
			}); // go through each post
			if(offsetCount<totalPosts){
				output+='<li class="centered" onclick="loadMorePosts(this);"><a><h3>show more posts...</h3></a></li>';
			}
			else{
				output+='<li class=centered"><a class="no-more-posts"><h3>That'+"'s all folks!</h3></a></li>";
			}
			$('#postlist ul').append(output);
			$('#postlist ul').listview('refresh');
		},
		error:function(data){},
	});
	return false;
	
}

function showPost(id) {
	$.ajax(
		{
			url:'https://public-api.wordpress.com/rest/v1/sites/debugmode.net/posts/' + id,
			success:function(data) {
							var output='';
							output += '<h3>' + data.title + '</h3>';
							output += data.content;
							$('#mypost').html(output);},
			error:function(){$('#mypost').text("Error! Please try again!");}
		}); //get JSON Data for Stories
} //showPost


function listVideos(data) {		
	var output ='';
	for ( var i=0; i<data.feed.entry.length; i++) {

		var title = data.feed.entry[i].title.$t;
		var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
		var description = data.feed.entry[0].media$group.media$description.$t;
		var id = data.feed.entry[0].id.$t.substring(38);
		
		var blocktype = ((i % 2)===1) ? 'b': 'a';
		
		output += '<div class="ui-block-' + blocktype + '">';

		output += '<a href="#videoplayer" data-transition="fade" onclick="playVideo(\'' +  id +'\',\'' + title + '\',\'' + escape(description) + '\')">';
		output += '<h3 class="movietitle">' + title + '</h3>';
		output += '<img src="' + thumbnail + '" alt="' + title + '" />';
		output +="</a>";
		output +="</div>";
	}
	
	$('#videolist').html(output);
}

function playVideo(id, title, description) {
	var output ='<iframe src="http://www.youtube.com/embed/'+ id +'?wmode=transparent&amp;HD=0&amp;rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>';
	output += '<h3>' + title + '</h3>';
	output += '<p>' + unescape(description) + '</p>';
	$('#myplayer').html(output);
}
