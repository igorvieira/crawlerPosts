Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model

var Post = Backbone.Model.extend({
	defaults: {
		titulo:'',
		formato: '',
		fonte: ''
	}
});

// Backbone Collection

var Posts = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/posts'
});

// instantiate a Collection

var posts = new Posts();

// Backbone View for one post




var PostView = Backbone.View.extend({
	model: new Post(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.posts-list-template').html());
	},
	events: {
		'click .delete-post': 'delete'
	},
	delete: function() {
		this.model.destroy({
			success: function(response) {
				console.log('Successfully DELETED blog with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to delete blog!');
			}
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});



var PostsView = Backbone.View.extend({
	model: posts,
	el: $('.posts-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('Successfully GOT post with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get posts!');
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(post) {
			self.$el.append((new PostView({model: post})).render().$el);
		});
		return this;
	}
});

var postsView = new PostsView();

$(document).ready(function() {
	$('.add-post').on('click', function() {
		var post= new Post({
			formato: $('.formato-input').val(),
			fonte: $('.fonte-input').val()
		});
		$('.formato-input').val('');
		$('.fonte-input').val('');
		posts.add(post);
		post.save(null, {
			success: function(response) {
				console.log('Successfully SAVED post with _id: ' + response.toJSON()._id);
			},
			error: function(error) {
				console.log('Failed to save post!'+error);
			}
		});
		setTimeout(function(){
			location.reload();
		},1000)
	});

	

})